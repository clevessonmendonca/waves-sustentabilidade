"use server";

import { prismaClient } from "@/lib/prisma";
import { CollectionSchedule } from "@prisma/client";

export const acceptSchedule = async (
  scheduleId: string,
  collectorId: string,
  schedule: CollectionSchedule,
) => {
  try {
    const getSchedule = await prismaClient.collectionSchedule.findUnique({
      where: { id: scheduleId },
    });

    if (!getSchedule) {
      return;
    }

    const acceptSchedule = await prismaClient.collectionSchedule.update({
      where: { id: scheduleId },
      data: {
        ...schedule,
        collectorId: collectorId,
      },
    });

    return acceptSchedule;
  } catch (error) {
    console.error("Erro ao aceitar agendamento:", error);
    return;
  }
};
