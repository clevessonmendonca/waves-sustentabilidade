"use server";

import { prismaClient } from "@/lib/prisma";
import { FormValues } from "../dashboard/collection/page";

export const createCollectionSchedule = async (
  data: FormValues,
  recyclerId: string,
): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      const collectionScheduleData = {
        materialType: data.materialType,
        quantityKg: data.quantityKg,
        collectionStartTime: data.collectionTime.startTime,
        collectionEndTime: data.collectionTime.endTime,
        dayOfWeek: data.dayOfWeek,
        description: data.description,
        image: data.image?.path || null,
        recycler: {
          connect: { id: recyclerId },
        },
      };

      const result = await prismaClient.collectionSchedule.create({
        data: collectionScheduleData,
      });

      console.log("Agendamento de coleta criado:", result);
      resolve(result);
    } catch (error) {
      console.error("Erro ao criar agendamento de coleta:", error);
      reject(error);
    }
  });
};
