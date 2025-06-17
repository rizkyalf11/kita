import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import type { EditProfileFormSchema } from "../forms/editProfileSchema";
import { Textarea } from "~/components/ui/textarea";

type EditProfileFormInnerProps = {
  onRegisterSubmit: (values: EditProfileFormSchema) => void;
  isLoading?: boolean;
  buttonText?: string;
  showPassword?: boolean;
};

export const EditProfileFormInner = (props: EditProfileFormInnerProps) => {
  const form = useFormContext<EditProfileFormSchema>();

  return (
    <form
      onSubmit={form.handleSubmit(props.onRegisterSubmit)}
      className="flex flex-col gap-y-4"
    >
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

      <Button disabled={props.isLoading} className="mt-4 w-full">
        {props.buttonText ?? "Simpan Perubahan"}
      </Button>
    </form>
  );
};
