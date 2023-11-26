"use server";

import { prismaClient } from "@/lib/prisma";

export const getCollector = async (id: string) => {
  try {
    const collector = await prismaClient.collector.findFirst({
      where: {
        personId: id
      }
    })

    return collector;
  } catch (error) {
    console.error("Error fetching collectors:", error);
    throw error;
  }
};
