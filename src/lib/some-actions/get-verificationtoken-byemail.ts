"use server";

import prisma from "../prisma";

export const existingToken = async (token: string) => {
  const tokens = await prisma.verificationToken.findFirst({
    where: {
      token,
    },
  });
  return tokens;
};
