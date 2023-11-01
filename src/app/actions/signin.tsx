"use server";

import { prismaClient } from "@/lib/prisma";
import { User } from "../signin/page";

export async function AddDataByUser(values: any, user: User): Promise<any> {
  return new Promise(async (resolve, reject) => {
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
        kgRecycled: values.kgRecycled,
        socialDonations: values.socialDonations,
        donationDetails: values.donationDetails,
        userId: user.id,
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
