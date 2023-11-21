"use server";

import { prismaClient } from "@/lib/prisma";

export const getCollectors = async () => {
  try {
    const collectors = await prismaClient.user.findMany({
      include: {
        person: {
          include: {
            collector: true
          }
        }
      }
    })

    return collectors;
  } catch (error) {
    console.error("Error fetching collectors:", error);
    throw error;
  }
};
