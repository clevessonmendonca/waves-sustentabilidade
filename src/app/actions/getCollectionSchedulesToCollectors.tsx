"use server";

import { prismaClient } from "@/lib/prisma";

export const getCollectionSchedulesToCollectors = async (id: string) => {
  try {
    const schedule = await prismaClient.collectionSchedule.findMany({
      where: {
        recyclerId: { not: id },
      },
    });

    return schedule;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};
