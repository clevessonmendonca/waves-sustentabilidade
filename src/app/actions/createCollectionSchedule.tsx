"use server";

import { prismaClient } from "@/lib/prisma";
import { FormCollectionValues } from "../dashboard/collection/page";

export const createCollectionSchedule = async (
  data: FormCollectionValues,
  recyclerId: string,
) => {
  try {
    const recycler = await prismaClient.recycler.findFirst({
      where: {
        userId: recyclerId,
      },
    });
    console.log(recyclerId, recycler);
    if (!recycler) {
      console.error("Reciclador não encontrado para o userId:", recyclerId);
      return;
    }

    const result = await prismaClient.collectionSchedule.create({
      data: {
        materialType: data.materialType,
        quantityKg: data.quantityKg,
        collectionStartTime: data.collectionTime.startTime,
        collectionEndTime: data.collectionTime.endTime,
        dayOfWeek: data.dayOfWeek,
        description: data.description,
        image: data.image?.path || null,
        recyclerId: recycler.id,
      },
    });

    return result
  } catch (error) {
    console.error("Erro ao criar agendamento de coleta:", error);
  } finally {
    await prismaClient.$disconnect();
  }
};
