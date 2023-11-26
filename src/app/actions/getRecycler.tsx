"use server";

import { prismaClient } from "@/lib/prisma";

export const getRecycler = async (id: string) => {
  try {
    const user = await prismaClient.recycler.findFirst({
      where: {
        personId: id,
      },
    });

    return user;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};
