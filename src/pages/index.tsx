import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { AuthRoute } from "~/components/layout/AuthRoute";
import { PageContainer } from "~/components/layout/PageContainer";
import { SectionContainer } from "~/components/layout/SectionContainer";
import { Button } from "~/components/ui/button";
import { supabase } from "~/lib/supabase/client";

export default function Home() {
  const [isLogin, setIsLogin] = useState<"loading" | true | false>("loading");
  const router = useRouter();

  useEffect(() => {
    void (async function () {
      const { data } = await supabase.auth.getUser();

      if (data.user) {
        setIsLogin(true);
      } else {
        setIsLogin(false);
      }
    })();
  }, []);

  const handleLogOut = async () => {
    await supabase.auth.signOut();
    toast("Anda telah keluar");
    setIsLogin(false);
  };

  return (
    <AuthRoute>
      <PageContainer>
        <SectionContainer>
          {isLogin && <Button onClick={handleLogOut}>Keluar</Button>}
          {!isLogin && (
            <Button onClick={() => router.replace("/login")}>Masuk</Button>
          )}
        </SectionContainer>
      </PageContainer>
    </AuthRoute>
  );
}
