import { zodResolver } from "@hookform/resolvers/zod";
import type { AuthError } from "@supabase/supabase-js";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";
import { PageContainer } from "~/components/layout/PageContainer";
import { SectionContainer } from "~/components/layout/SectionContainer";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "~/components/ui/card";
import { Form } from "~/components/ui/form";
import { SupabaseAuthErrorCode } from "~/lib/supabase/authErrorCodes";
import { supabase } from "~/lib/supabase/client";
import { RegisterFormInner } from "../components/RegisterFormInner";
import { registerFormSchema, type RegisterFormSchema } from "../forms/register";
import { GuestRoute } from "~/components/layout/GuestRoute";

const LoginPage = () => {
  const form = useForm<RegisterFormSchema>({
    resolver: zodResolver(registerFormSchema),
  });

  const router = useRouter();

  const handleLoginSubmit = async (values: RegisterFormSchema) => {
    console.log("ya");

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });

      if (error) throw error;

      await router.replace("/");
    } catch (error) {
      switch ((error as AuthError).code) {
        case SupabaseAuthErrorCode.invalid_credentials:
          form.setError("email", { message: "Email atau Password Salah" });
          form.setError("password", { message: "Email atau Password Salah" });
          break;
        case SupabaseAuthErrorCode.email_not_confirmed:
          form.setError("email", { message: "Email belum Diverifikasi!" });
          break;
        default:
          toast.error("Sebuah kesalahan terjadi, coba lagi beberapa saat.");
      }
    }
  };

  return (
    <GuestRoute>
      <PageContainer withFooter>
        <SectionContainer minFullscreen="withOffset" className="justify-center">
          <Card className="w-full max-w-[480px] self-center">
            <CardHeader className="flex flex-col items-center justify-center">
              <h1 className="text-primary text-3xl font-bold">Masuk Akun</h1>
              <p className="text-muted-foreground">
                Tempatmu Berbagi, Ruangmu Bersinar
              </p>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <RegisterFormInner
                  onRegisterSubmit={handleLoginSubmit}
                  buttonText="Masuk"
                />
              </Form>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <div className="flex w-full items-center justify-between gap-x-4">
                <div className="h-[2px] w-full border-t-2" />
                <p className="text-muted-foreground flex-1 text-sm text-nowrap">
                  Atau lanjut dengan
                </p>
                <div className="h-[2px] w-full border-t-2" />
              </div>

              <Button disabled className="w-full" size="lg" variant="secondary">
                <FcGoogle />
                Masuk dengan Google
              </Button>

              <p>
                Belum punya akun{" "}
                <Link className="font-bold text-blue-600" href="/register">
                  Register
                </Link>{" "}
              </p>
            </CardFooter>
          </Card>
        </SectionContainer>
      </PageContainer>
    </GuestRoute>
  );
};

export default LoginPage;
