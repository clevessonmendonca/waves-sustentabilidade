"use server";

import { prismaClient } from "@/lib/prisma";
import { FormCollectionValues } from "../dashboard/collection/page";

export const editCollectionSchedule = async (
  data: FormCollectionValues,
  recyclerId: string,
) => {
  try {
    const user = await prismaClient.person.findFirst({
      where: { userId: recyclerId },
      include: {
        recycler: true,
      },
    });

    if (!user) return;

    const result = await prismaClient.collectionSchedule.updateMany({
      data: {
        materialType: data.materialType,
        quantityKg: data.quantityKg,
        collectionStartTime: data.collectionTime.startTime,
        collectionEndTime: data.collectionTime.endTime,
        dayOfWeek: data.dayOfWeek,
        description: data.description,
        image: data.image?.path || null,
        recyclerId: user.recycler[0].id,
      },
    });

    return result;
  } catch (error) {
    console.error("Erro ao criar agendamento de coleta:", error);
  } finally {
    await prismaClient.$disconnect();
  }
};
