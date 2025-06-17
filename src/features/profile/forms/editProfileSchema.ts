import z from "zod";

export const editProfileFormSchema = z.object({
  username: z.string().min(3, "min 3 karakter").max(16, "max 16 karakter"),
  nickname: z.string().min(3, "min 3 karakter").max(16, "max 20 karakter"),
  bio: z.string().max(255, "max 255 karakter").optional(),
});

export type EditProfileFormSchema = z.infer<typeof editProfileFormSchema>;
