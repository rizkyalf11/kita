/* eslint-disable react-hooks/exhaustive-deps */
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Camera } from "lucide-react";
import { useRouter } from "next/router";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ChangeEventHandler,
} from "react";
import { useForm } from "react-hook-form";
import AuthLayout from "~/components/layout/AuthLayout";
import { PageContainer } from "~/components/layout/PageContainer";
import { SectionContainer } from "~/components/layout/SectionContainer";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { Form } from "~/components/ui/form";
import { Separator } from "~/components/ui/separator";
import type { NextPageWithLayout } from "~/lib/types/layout";
import { EditProfileFormInner } from "../components/EditProfileFormInner";
import {
  editProfileFormSchema,
  type EditProfileFormSchema,
} from "../forms/editProfileSchema";
import { ImageCropperDialog } from "../components/CropperDialog";
import { api } from "~/utils/api";
import { toast } from "sonner";
import EditProfilePageSkeleton from "../components/EditProfilePageSkeleton";

const EditProfilePage: NextPageWithLayout = () => {
  const { data: getProfileData, isPending } = api.profile.getProfile.useQuery();
  const router = useRouter();
  const form = useForm<EditProfileFormSchema>({
    resolver: zodResolver(editProfileFormSchema),
  });
  const [previewUrlForCropper, setPreviewUrlForCropper] = useState<
    string | null
  >(null);
  const [croppedImageFile, setCroppedImageFile] = useState<File | null>(null);
  const [previewUrlForAvatar, setPreviewUrlForAvatar] = useState<string | null>(
    null,
  );
  const [isCropperDialogOpen, setIsCropperDialogOpen] = useState(false);

  const apiUtils = api.useUtils();

  const updateProfilePicture = api.profile.updateProfilePicture.useMutation({
    onSuccess: async () => {
      toast.success("Berhasil ganti poto profile");
      setPreviewUrlForCropper(null);
      setCroppedImageFile(null);
      setPreviewUrlForAvatar(null);
      if (inputFileRef.current) {
        inputFileRef.current.value = "";
      }
      await apiUtils.profile.getProfile.invalidate();
    },
    onError: () => {
      toast.error("ada kesalahan");
    },
  });

  const inputFileRef = useRef<HTMLInputElement>(null);
  const onPickProfilePicture: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setPreviewUrlForCropper(URL.createObjectURL(file!));
      setIsCropperDialogOpen(true);
    } else {
      setPreviewUrlForCropper(null);
    }
    if (inputFileRef.current) {
      inputFileRef.current.value = "";
    }
  };

  const handleImageCropped = (file: File) => {
    setCroppedImageFile(file);
    setPreviewUrlForAvatar(URL.createObjectURL(file));
  };

  const handleOpenFileExplorel = () => {
    inputFileRef.current?.click();
  };

  const handleRemoveProfilePicture = () => {
    setPreviewUrlForCropper(null);
    setCroppedImageFile(null);
    setPreviewUrlForAvatar(null);
    if (inputFileRef.current) {
      inputFileRef.current.value = "";
    }
  };

  const finalProfilePictureSrc = useMemo(() => {
    if (previewUrlForAvatar) {
      return previewUrlForAvatar;
    }
    return null;
  }, [previewUrlForAvatar]);

  const handleUpdateProfilePicture = async () => {
    if (croppedImageFile) {
      const reader = new FileReader();

      reader.onloadend = function () {
        const result = reader.result as string;
        const imageBase64 = result.substring(result.indexOf(",") + 1);

        updateProfilePicture.mutate(imageBase64);
        console.log(imageBase64);
      };

      reader.readAsDataURL(croppedImageFile);
    }
  };

  const { mutate: updateProfile, isPending: isPendingUpdate } =
    api.profile.updateProfile.useMutation({
      onSuccess: () => {
        form.reset();
        toast.success("Berhasil update profile");
      },
      onError: (err) => {
        if (err.data?.code === "UNPROCESSABLE_CONTENT") {
          toast.error("Username sudah digunakan");
          form.setError("username", {
            message: "username sudah digunakan",
          });
        } else {
          toast.error("Gagal update profile");
        }
      },
    });

  const handleUpdateProfile = (values: EditProfileFormSchema) => {
    const payload: { username?: string; bio?: string; nickname?: string } = {};

    if (values.username != getProfileData?.username) {
      payload.username = values.username;
    }

    if (values.bio !== getProfileData?.bio) {
      payload.bio = values.bio;
    }

    if (values.nickname !== getProfileData?.nickname) {
      payload.nickname = values.nickname;
    }

    updateProfile(payload);
  };

  useEffect(() => {
    if (getProfileData) {
      form.setValue("username", getProfileData.username ?? "");
      form.setValue("nickname", getProfileData.nickname ?? "");
      form.setValue("bio", getProfileData.bio ?? "");
    }
  }, [getProfileData]);

  return (
    <PageContainer>
      <SectionContainer minFullscreen="withoutOffset">
        <div className="flex w-full items-center gap-x-4 py-2 lg:py-4">
          <Button
            onClick={() => router.replace("/profile")}
            size="icon"
            variant="ghost"
          >
            <ArrowLeft />
          </Button>
          <h1 className="text-primary text-xl font-semibold tracking-tight lg:text-2xl">
            Edit Profile
          </h1>
        </div>

        <Separator className="mb-2 lg:mb-4" />

        {isPending ? (
          <EditProfilePageSkeleton />
        ) : (
          <>
            <div className="flex flex-col items-center space-y-4 p-6">
              <div className="relative">
                <Avatar className="h-24 w-24">
                  <AvatarImage
                    src={finalProfilePictureSrc ?? getProfileData?.avatar ?? ""}
                    alt={getProfileData?.username}
                  />
                  <AvatarFallback className="bg-gradient-to-br from-purple-400 to-pink-400 text-lg font-semibold text-white">
                    {getProfileData?.username
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <input
                  accept="image/*"
                  onChange={onPickProfilePicture}
                  className="hidden"
                  type="file"
                  ref={inputFileRef}
                />
                <Button
                  onClick={handleOpenFileExplorel}
                  size="icon"
                  variant="default"
                  className="absolute -right-1 -bottom-1 rounded-full"
                >
                  <Camera className="h-4 w-4" />
                </Button>
              </div>
              <div className="text-center">
                {finalProfilePictureSrc ? (
                  <div className="flex items-center">
                    <Button
                      onClick={handleRemoveProfilePicture}
                      variant="link"
                      className="text-red-800"
                    >
                      Hapus foto profil
                    </Button>
                    <div className="bg-border h-[20px] w-[1.5px]" />

                    <Button
                      onClick={handleUpdateProfilePicture}
                      variant="link"
                      className="text-blue-800"
                    >
                      Simpan foto profil
                    </Button>
                  </div>
                ) : (
                  <Button
                    onClick={handleOpenFileExplorel}
                    variant="link"
                    className="text-blue-800"
                  >
                    Ubah foto profil
                  </Button>
                )}
              </div>
            </div>

            <Separator className="mb-4 lg:mb-6" />

            <div>
              <Form {...form}>
                <EditProfileFormInner />
              </Form>
            </div>

            <Button
              disabled={!form.formState.isDirty}
              onClick={form.handleSubmit(handleUpdateProfile)}
              className="mt-4 w-full"
            >
              {isPendingUpdate ? "Loading..." : "Simpan Perubahan"}
            </Button>
          </>
        )}

        <div className="h-20" />
      </SectionContainer>
      <ImageCropperDialog
        imageSrc={previewUrlForCropper}
        isOpen={isCropperDialogOpen}
        onClose={() => {
          setIsCropperDialogOpen(false);
          setPreviewUrlForCropper(null);
        }}
        onImageCropped={handleImageCropped}
        aspectRatio={1 / 1}
        outputWidth={200}
        outputHeight={200}
        compressionQuality={0.8}
        fileName="profile_avatar.jpeg"
      />
    </PageContainer>
  );
};

EditProfilePage.getLayout = (page) => <AuthLayout>{page}</AuthLayout>;
export default EditProfilePage;
