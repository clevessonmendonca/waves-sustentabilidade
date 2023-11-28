"use server";

import { prismaClient } from "@/lib/prisma";

export const getScheduleDetails = async (id: string) => {
  try {
    const schedule = await prismaClient.collectionSchedule.findFirst({
      where: {
        id,
      },
    });

    if (!schedule) {
      throw new Error("Schedule not found");
    }

    const recycler = await prismaClient.recycler.findFirst({
      where: {
        id: schedule.recyclerId,
      },
    });

    if (!recycler) {
      throw new Error("Recycler not found");
    }

    const person = await prismaClient.person.findFirst({
      where: {
        id: recycler.personId,
      },
    });

    if (!person) {
      throw new Error("Person not found");
    }

    const user = await prismaClient.user.findFirst({
      where: {
        id: person.userId,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }
    const updatedPerson = {
      ...person,
      email: user.email,
      avatar: user.image || null,
    };

    return { schedule, recycler, person: updatedPerson };
  } catch (error) {
    console.error("Error fetching schedule details:", error);
    throw error;
  }
};
