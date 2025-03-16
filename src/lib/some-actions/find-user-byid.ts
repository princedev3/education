import prisma from "../prisma";

export const findUserById = async (id: string) => {
  const users = await prisma.user.findFirst({
    where: {
      id,
    },
  });
  return users;
};
