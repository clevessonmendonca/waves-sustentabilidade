"use server";

import { prismaClient } from "@/lib/prisma";

export async function VerifyProfile(userId: string): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      const verified = await prismaClient.recycler.findFirst({
        where: {
          userId,
        },
      });

      resolve(verified);
    } catch (error) {
      reject(error);
    }
  });
}
