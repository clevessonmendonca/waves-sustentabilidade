"use server";

import { prismaClient } from "@/lib/prisma";
import { RecycleFormValues } from "../signin/(recycle)/components/RecyclerForm";

export async function createRecycler(
  values: RecycleFormValues,
  userId: string,
): Promise<any> {
  return new Promise(async (resolve, reject) => {
    const kgRecycled = Number(values.kgRecycled);

    try {
      const person = await prismaClient.person.create({
        data: {
          name: values.name,
          phone: values.phone,
          cep: values.cep,
          city: values.city,
          uf: values.uf,
          birthDate: values.birthDate,
          sex: values.sex,
          cpfCnpj: values.cpfCnpj,
          timeInMarket: values.timeInMarket,
          userId,
        },
      });

      const recycler = await prismaClient.recycler.create({
        data: {
          recyclingServiceDescription: values.recyclingServiceDescription,
          kgRecycled: 0,
          socialDonations: values.socialDonations,
          donationDetails: values.donationDetails,
          personId: person.id,
        },
      });

      resolve(recycler);
    } catch (error) {
      reject(error);
    }
  });
}
