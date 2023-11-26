"use server";

import { prismaClient } from "@/lib/prisma";

export const deleteCollectionSchedule = async (scheduleId: string) => {
  try {
    const schedule = await prismaClient.collectionSchedule.delete({
      where: {
        id: scheduleId,
      },
    });

    return schedule;
  } catch (error) {
    console.error("Erro ao excluir agendamento de coleta:", error);
  } finally {
    await prismaClient.$disconnect();
  }
};
