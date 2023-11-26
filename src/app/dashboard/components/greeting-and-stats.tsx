"use client";

import Loading from "@/app/loading";
import { UserContext } from "@/app/providers/user";
import { Card } from "@/components/ui/card";
import { ArchiveRestoreIcon } from "lucide-react";
import React, { useContext } from "react";

export const GreetingAndStats = () => {
  const userData = useContext(UserContext);

  if (!userData) {
    return <Loading />;
  }

  const person = userData.userData;

  return (
    <div className="mx-auto mt-2 flex max-w-screen-xl flex-col justify-between gap-8 px-5 md:flex-row md:items-center">
      <h1 className="max-w-sm text-xl font-medium">
        Bem-vindo {person?.name}. Vamos fazer uma nova coleta?
      </h1>

      <div className="flex flex-wrap gap-6">
        <Card className="flex items-center gap-4 border-none bg-transparent md:justify-center">
          <span className="rounded-xl bg-accent p-5">
            <ArchiveRestoreIcon size={26} />
          </span>
          <div className="flex flex-col justify-between gap-4">
            <h3 className="text-sm opacity-75">Quilos coletado</h3>
            <p className="text-xl font-medium">
              {person?.recycler?.map((recycler) => recycler.kgRecycled)} Kg
            </p>
          </div>
        </Card>
        <Card className="flex items-center gap-4 border-none bg-transparent md:justify-center">
          <span className="rounded-xl bg-accent p-5">
            <ArchiveRestoreIcon size={26} />
          </span>
          <div className="flex flex-col justify-between gap-4">
            <h3 className="text-sm opacity-75">Quilos coletado</h3>
            <p className="text-xl font-medium">
              {person?.recycler?.map((recycler) => recycler.kgRecycled)} Kg
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};
