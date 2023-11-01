"use server";

import { prismaClient } from "../../lib/prisma";

export async function getUserByEmail(email: string) {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await prismaClient.user.findFirst({
        where: {
          email: email,
        },
      });

      resolve(user);
    } catch (error) {
      reject(error);
    }
  });
}
