"use server";

import { prismaClient } from "@/lib/prisma";

export async function VerifyProfile(userId: string): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      const person = await prismaClient.person.findFirst({
        where: { userId },
        include: {
          recycler: true,
        },
      });

      person?.recycler && person?.recycler?.length <= 0 && resolve(null);

      resolve(person);
    } catch (error) {
      reject(error);
    }
  });
}
