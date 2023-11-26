"use server";

import { prismaClient } from "@/lib/prisma";

export const getCollectorSession = async (id: string) => {
  try {
    const collector = await prismaClient.person.findFirst({
      where: {
        userId: id,
      },
      include: {
        collector: true,
      },
    });
console.log(collector)
    return collector;
  } catch (error) {
    console.error("Error fetching collectors:", error);
    throw error;
  }
};
