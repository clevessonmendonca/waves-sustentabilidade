"use server";

import { prismaClient } from "@/lib/prisma";

export async function VerifyProfile(userId: string): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await prismaClient.person.findFirst({
        where: { userId },
        include: {
          recycler: true,
        },
      });

      resolve(user);
    } catch (error) {
      reject(error);
    }
  });
}
