import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import type { EditProfileFormSchema } from "../forms/editProfileSchema";

export const EditProfileFormInner = () => {
  const form = useFormContext<EditProfileFormSchema>();

  return (
    <form className="flex flex-col gap-y-4">
      <FormField
        control={form.control}
        name="username"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nama Pengguna</FormLabel>
            <FormControl>
              <Input type="text" {...field} />
            </FormControl>
            <FormDescription>
              Nama pengguna Anda akan terlihat oleh pengguna lain
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="nickname"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nama</FormLabel>
            <FormControl>
              <Input type="text" {...field} />
            </FormControl>
            <FormDescription>
              Bantu orang menemukan akun Anda dengan menggunakan nama yang Anda
              kenal
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="bio"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Bio</FormLabel>
            <FormControl>
              <Textarea rows={3} {...field} />
            </FormControl>
            <FormDescription>
              Ceritakan sedikit tentang diri Anda
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </form>
  );
};
