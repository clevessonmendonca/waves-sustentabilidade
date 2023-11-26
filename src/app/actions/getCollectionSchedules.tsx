"use server";

import { prismaClient } from "@/lib/prisma";

export const getCollectionSchedules = async (id: string) => {
  try {
    const schedule = await prismaClient.collectionSchedule.findMany({
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
