"use server";
import prisma from "../prisma";

export const generateVerificationtokenbyemail = async (email: string) => {
  const existingToken = await prisma.verificationToken.findFirst({
    where: {
      email,
    },
  });

  if (existingToken) {
    await prisma.verificationToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const expires = new Date(new Date().getTime() + 60 * 1000 * 10);
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i <= 6; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }

  const createToken = await prisma.verificationToken.create({
    data: {
      token: result,
      email: email,
      expires,
    },
  });
  return createToken;
};
