"use server";

import { prismaClient } from "@/lib/prisma";

export const getUser = async (id: string) => {
  try {
    const person = await prismaClient.person.findFirst({
      where: {
        userId: id,
      },
      include: {
        recycler: true,
      },
    });
    console.log(person);
    return person;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};
