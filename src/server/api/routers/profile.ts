import { createTRPCRouter, privateProcedure } from "../trpc";

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
});
