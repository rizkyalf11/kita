import { ArrowLeft, Camera } from "lucide-react";
import { useForm } from "react-hook-form";
import { PageContainer } from "~/components/layout/PageContainer";
import { SectionContainer } from "~/components/layout/SectionContainer";
import { Avatar, AvatarFallback } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { Form } from "~/components/ui/form";
import { Separator } from "~/components/ui/separator";
import { EditProfileFormInner } from "../components/EditProfileFormInner";
import { useRouter } from "next/router";

const EditProfilePage = () => {
  const router = useRouter()
  const form = useForm();
  return (
    <PageContainer>
      <SectionContainer minFullscreen="withoutOffset">
        <div className="flex w-full items-center gap-x-4 py-2 lg:py-4">
          <Button onClick={() => router.replace("/profile")} size="icon" variant="ghost">
            <ArrowLeft />
          </Button>
          <h1 className="text-primary text-xl font-semibold tracking-tight lg:text-2xl">
            Edit Profile
          </h1>
        </div>

        <Separator className="mb-2 lg:mb-4" />

        <div className="flex flex-col items-center space-y-4 p-6">
          <div className="relative">
            <Avatar className="h-24 w-24">
              {/* <AvatarImage
                src={profileData.avatar}
                alt={profileData.displayName}
              /> */}
              <AvatarFallback className="bg-gradient-to-br from-purple-400 to-pink-400 text-lg font-semibold text-white">
                {"AA"
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <Button
              // onClick={handleAvatarChange}
              size="icon"
              variant="default"
              className="absolute -right-1 -bottom-1 rounded-full"
            >
              <Camera className="h-4 w-4" />
            </Button>
          </div>
          <div className="text-center">
            <Button
              // onClick={handleAvatarChange}
              variant="link"
              className="text-blue-800"
            >
              Ubah foto profil
            </Button>
          </div>
        </div>

        <Separator className="mb-4 lg:mb-6" />

        <div>
          <Form {...form}>
            <EditProfileFormInner onRegisterSubmit={() => {
              console.log('')
            }} />
          </Form>
        </div>

        <div className="h-28" />
      </SectionContainer>
    </PageContainer>
  );
};

export default EditProfilePage;
