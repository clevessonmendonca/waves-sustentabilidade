"use server";

import { prismaClient } from "@/lib/prisma";
import { CollectorFormValues } from "../signin/collector/page";

export async function createCollector(
  values: CollectorFormValues,
  userId: string,
): Promise<any> {
  try {
    const person = await prismaClient.person.findFirst({
      where: {
        userId,
      },
    });

    if (!person) return Promise.reject();

    const collector = await prismaClient.collector.create({
      data: {
        collectionServiceDescription: values.collectionServiceDescription,
        cpfCnpj: values.cpfCnpj,
        isoCertification: values.isoCertification,
        kgCollected: 0,
        marketTime: values.marketTime,
        organization: values.organization,
        purchases: "",
        biography: values.bio,
        personId: person.id,
      },
    });

    return collector;
  } catch (error) {
    throw error;
  }
}
