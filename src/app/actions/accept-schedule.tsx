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
        status: "in_process",
        collectorId: collectorId,
      },
    });

    const notification = await prismaClient.notification.create({
      data: {
        recyclerId: schedule.recyclerId,
        message: "Seu agendamento foi aceito pelo coletador.",
      },
    });

    if (!notification) return;

    return acceptSchedule;
  } catch (error) {
    console.error("Erro ao aceitar agendamento:", error);
    return;
  }
};
