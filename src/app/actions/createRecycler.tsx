"use server";

import { prismaClient } from "@/lib/prisma";
import { RecycleFormValues } from "../signin/components/recycle-form";

export async function createRecycler(
  values: RecycleFormValues,
  userId: string,
): Promise<any> {
  return new Promise(async (resolve, reject) => {
    const kgRecycled = Number(values.kgRecycled);

    try {
      const recyclerData = {
        name: values.name,
        organization: values.organization,
        phone: values.phone,
        cpfCnpj: values.cpfCnpj,
        cep: values.cep,
        isoCertification: values.isoCertification,
        marketTime: values.marketTime,
        recyclingServiceDescription: values.recyclingServiceDescription,
        kgRecycled,
        socialDonations: values.socialDonations,
        donationDetails: values.donationDetails,
        userId,
      };

      const recycler = await prismaClient.recycler.create({
        data: recyclerData,
      });

      console.log("Reciclador criado:", recycler);

      resolve(recycler);
    } catch (error) {
      reject(error);
    }
  });
}
