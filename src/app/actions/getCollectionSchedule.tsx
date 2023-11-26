"use server";

import { prismaClient } from "@/lib/prisma";

export const getCollectionSchedule = async (id: string) => {
  try {
    const schedule = await prismaClient.collectionSchedule.findFirst({
      where: {
        recyclerId: id,
      },
    });

    return schedule;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};
