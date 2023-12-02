"use client";

import { Collector } from "@/@types/User";
import { getCollectionSchedules } from "@/app/actions/getCollectionSchedules";
import Loading from "@/app/loading";
import { UserContext } from "@/app/providers/user";
import { Card } from "@/components/ui/card";
import { ArchiveRestoreIcon, MedalIcon, PackageOpenIcon } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";

export const GreetingAndStats = ({
  collector,
}: {
  collector: Collector | null;
}) => {
  const userData = useContext(UserContext);
  const [scheduleLength, setSchedules] = useState<number | null>(null);

  useEffect(() => {
    const fetchCollectionSchedule = async () => {
      if (userData?.userData?.recycler) {
        const totalSchedules = await Promise.all(
          userData.userData.recycler.map(async (recycler) => {
            const schedule = await getCollectionSchedules(recycler.id);
            return schedule ? schedule.length : 0;
          })
        );

        setSchedules(totalSchedules.reduce((acc, val) => acc + val, 0));
      }
    };

    if (!scheduleLength) {
      fetchCollectionSchedule();
    }
  }, [userData]);

  if (!userData) {
    return <Loading />;
  }

  const person = userData.userData;

  return (
    <div className="mx-auto mt-2 flex max-w-screen-xl flex-col justify-between gap-8 px-5 md:flex-row md:items-center">
      <h1 className="max-w-sm text-xl font-medium">
        Bem-vindo {person?.name}.
        {collector ? (
          <> Que tal comprar items recicláveis?</>
        ) : (
          <> Vamos fazer uma nova coleta?</>
        )}
      </h1>

      <div className="flex flex-wrap gap-6">
        <Card
          className="flex items-center gap-4 border-none bg-transparent md:justify-center"
          style={{ width: "18rem" }}
        >
          <span className="rounded-xl bg-accent p-5">
            <ArchiveRestoreIcon size={26} />
          </span>
          <div className="flex flex-col justify-between gap-4">
            <h3 className="text-sm opacity-75">Quilos coletados</h3>
            <p className="text-xl font-medium">
              {person?.recycler?.reduce(
                (acc, recycler) => acc + recycler.kgRecycled,
                0
              )}{" "}
              Kg
            </p>
          </div>
        </Card>
        <Card
          className="flex items-center gap-4 border-none bg-transparent md:justify-center"
          style={{ width: "18rem" }}
        >
          <span className="rounded-xl bg-accent p-5">
            <PackageOpenIcon size={26} />
          </span>
          <div className="flex flex-col justify-between gap-4">
            <h3 className="text-sm opacity-75">Total de Coletas</h3>
            <div className="flex items-end justify-between gap-6">
              <p className="text-xl font-medium">{scheduleLength}</p>
              <span className="flex gap-1 text-xs text-green-500">
                <MedalIcon size={16} /> 2
              </span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
