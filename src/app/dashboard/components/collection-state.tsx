"use client";

import { getCollectionSchedule } from "@/app/actions/getCollectionSchedule";
import Loading from "@/app/loading";
import { UserContext } from "@/app/providers/user";
import { Card } from "@/components/ui/card";
import { CollectionSchedule } from "@prisma/client";
import React, { useContext, useEffect, useState } from "react";
import { CollectionsSchedule } from "./Collections-schedule";
import { CalendarDaysIcon, InfoIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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
          <div className="flex items-center gap-4">
            <span className="inline-block rounded-full bg-accent p-4">
              <CalendarDaysIcon />
            </span>
            <h4 className="text-lg font-medium">Agendar Coleta</h4>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <InfoIcon className="text-yellow-500" />
              <p className="text-sm opacity-75">
                Você pode agendar uma coleta!
              </p>
            </div>
            <Link href="/dashboard/collection">
              <Button className="rounded-full">Fazer pedido</Button>
            </Link>
          </div>
        </Card>
      )}
    </div>
  );
};
