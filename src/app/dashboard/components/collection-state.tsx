"use client";

import { getCollectionSchedule } from "@/app/actions/getCollectionSchedule";
import Loading from "@/app/loading";
import { UserContext } from "@/app/providers/user";
import { Card } from "@/components/ui/card";
import { CollectionSchedule } from "@prisma/client";
import React, { useContext, useEffect, useState } from "react";
import { CollectionsSchedule } from "./Collections-schedule";

export const CollectionState = () => {
  const userData = useContext(UserContext);
  const [schedules, setSchedules] = useState<CollectionSchedule | null>(null);

  useEffect(() => {
    const fetchCollectionSchedule = async () => {
      userData?.userData?.recycler.map(async (recycler) => {
        const schedule = await getCollectionSchedule(recycler.id);

        if (!schedule) return;
        setSchedules(schedule);
      });
    };

    if (schedules) return;

    fetchCollectionSchedule();
  }, [userData]);

  if (!userData) {
    return <Loading />;
  }
  return (
    <div>
      {schedules ? (
        <>
          <CollectionsSchedule schedule={schedules} />
        </>
      ) : (
        <Card className="flex flex-wrap justify-between rounded-full px-4 py-1">
          Fazer coleta
        </Card>
      )}
    </div>
  );
};
