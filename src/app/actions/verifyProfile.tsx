"use server";

import { prismaClient } from "@/lib/prisma";
import { User } from "../signin/page";

export async function VerifyProfile(user: User): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      const verified = await prismaClient.user.findFirst({
        where: {
          id: user.id,
        },
        include: {
          recyclers: true,
        },
      });

      resolve(verified)
    } catch (error) {
      reject(error);
    }
  });
}
