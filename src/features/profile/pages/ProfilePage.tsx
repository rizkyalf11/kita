import { Grid3x2, LogOut } from "lucide-react";
import Image from "next/image";
import { AuthRoute } from "~/components/layout/AuthRoute";
import { PageContainer } from "~/components/layout/PageContainer";
import { SectionContainer } from "~/components/layout/SectionContainer";
import { Avatar, AvatarFallback } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";
import { api } from "~/utils/api";
import LoadingSkeleton from "../components/LoadingSkeleton";

const ProfilePage = () => {
  const { data: getProfileData, isPending } = api.profile.getProfile.useQuery();

  const posts = Array.from({ length: 11 }, (_, i) => ({
    id: i + 1,
    image: `/logorental.png`,
    likes: Math.floor(Math.random() * 1000) + 100,
    comments: Math.floor(Math.random() * 50) + 5,
  }));

  if (isPending) {
    return <LoadingSkeleton />;
  }

  return (
    <AuthRoute>
      <PageContainer>
        <SectionContainer minFullscreen="withoutOffset">
          <div className="flex w-full justify-between py-2 lg:py-4">
            <h1 className="text-primary text-xl font-semibold tracking-tight lg:text-2xl">
              @{getProfileData?.username}
            </h1>

            <Button size="icon" variant="ghost">
              <LogOut />
            </Button>
          </div>

          <Separator className="mb-2 lg:mb-4" />

          <div>
            <div className="mb-4 flex items-center space-x-4">
              <Avatar className="h-20 w-20">
                {/* <AvatarImage src={profileData.avatar} alt={profileData.displayName} /> */}
                <AvatarFallback className="bg-gradient-to-br from-purple-400 to-pink-400 text-lg font-semibold text-white">
                  {getProfileData?.username
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <div className="flex justify-around text-center">
                  <div>
                    <div className="text-primary text-lg font-semibold tracking-tight">
                      {getProfileData?.posts.length}
                    </div>
                    <div className="text-muted-foreground text-sm tracking-tight">
                      posts
                    </div>
                  </div>
                  <div>
                    <div className="text-lg font-semibold tracking-tight">
                      {0}
                    </div>
                    <div className="text-muted-foreground text-sm tracking-tight">
                      followers
                    </div>
                  </div>
                  <div>
                    <div className="text-lg font-semibold tracking-tight">
                      {0}
                    </div>
                    <div className="text-muted-foreground text-sm tracking-tight">
                      following
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <h2 className="text-primary mb-1 text-base font-semibold tracking-tight lg:text-lg">
                {getProfileData?.nickname}
              </h2>
              <p className="text-secondary-foreground text-sm leading-relaxed whitespace-pre-line lg:text-base">
                {getProfileData?.bio}
              </p>
            </div>

            <Button className="w-full" variant="outline">
              Edit profile
            </Button>
          </div>

          <div className="my-6">
            <Grid3x2 className="text-primary mb-1 opacity-90" />
            <Separator className="border-primary border-[0.5px] opacity-50" />
          </div>

          <div className="bg-background grid grid-cols-3 gap-0.5">
            {posts.map((post) => (
              <div
                key={post.id}
                className="group bg-background group relative aspect-square cursor-pointer"
              >
                <Image
                  width="200"
                  height="200"
                  src={post.image}
                  alt={`Post ${post.id}`}
                  className="h-full w-full object-cover"
                />
                <div className="absolute top-0 right-0 bottom-0 left-0 bg-black opacity-0 transition-all duration-300 group-hover:opacity-15"></div>
              </div>
            ))}
          </div>

          <div className="h-28" />
        </SectionContainer>
      </PageContainer>
    </AuthRoute>
  );
};

export default ProfilePage;
