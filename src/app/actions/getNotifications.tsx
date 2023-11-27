"use server";

import { prismaClient } from "@/lib/prisma";

export const getNotification = async () => {
  try {
    const notifications = await prismaClient.notification.findMany({
      where: {
        isRead: false,
      },
    });

    return notifications;
  } catch (error) {
    console.error("Error fetching notifications:", error);
    throw error;
  }
};
