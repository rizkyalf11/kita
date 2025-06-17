import z from "zod";
import { createTRPCRouter, privateProcedure } from "../trpc";
import { supabaseAdminClient } from "~/lib/supabase/server";
import { SUPABASE_BUCKET } from "~/lib/supabase/bucket";
import { TRPCError } from "@trpc/server";

export const profileRouter = createTRPCRouter({
  getProfile: privateProcedure.query(async ({ ctx }) => {
    const { db, user } = ctx;
    const profile = await db.profile.findUnique({
      where: {
        id: user?.id,
      },
      select: {
        username: true,
        email: true,
        nickname: true,
        bio: true,
        avatar: true,
        posts: true,
      },
    });

    return profile;
  }),

  updateProfilePicture: privateProcedure
    .input(z.string().base64().optional())
    .mutation(async ({ ctx, input }) => {
      const { db, user } = ctx;

      const timestamp = new Date().getTime().toString();

      const fileName = `avatar-${user?.id}.jpeg`;

      if (input) {
        const buffer = Buffer.from(input, "base64");

        const { data, error } = await supabaseAdminClient.storage
          .from(SUPABASE_BUCKET.ProfilePictures)
          .upload(fileName, buffer, {
            contentType: "image/jpeg",
            upsert: true,
          });

        if (error) throw error;

        const profilePictureUrl = supabaseAdminClient.storage
          .from(SUPABASE_BUCKET.ProfilePictures)
          .getPublicUrl(data.path);

        await db.profile.update({
          where: {
            id: user?.id,
          },
          data: {
            avatar: profilePictureUrl.data.publicUrl + "?t=" + timestamp,
          },
        });
      }
    }),

  updateProfile: privateProcedure
    .input(
      z.object({
        // TODO: sanitize username input
        username: z.string().min(3).max(16).toLowerCase().optional(),
        nickname: z.string().min(3).max(16).optional(),
        bio: z.string().max(300).optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { db, user } = ctx;
      const { username, bio, nickname } = input;

      if (username) {
        const usernameExists = await db.profile.findUnique({
          where: {
            username,
          },
          select: {
            id: true,
          },
        });

        if (usernameExists) {
          throw new TRPCError({
            code: "UNPROCESSABLE_CONTENT",
            message: "Username already used",
          });
        }
      }

      const updatedUser = await db.profile.update({
        where: {
          id: user?.id,
        },
        data: {
          username,
          bio,
          nickname
        },
      });

      return updatedUser;
    }),
});
