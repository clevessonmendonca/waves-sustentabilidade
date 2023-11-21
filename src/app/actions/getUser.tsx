"use server";

import { prismaClient } from "@/lib/prisma";

export const getUser = async (id: string) => {
  try {
    const user = await prismaClient.person.findFirst({
      where: {
        userId: id,
      },
    });

    return user;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};
