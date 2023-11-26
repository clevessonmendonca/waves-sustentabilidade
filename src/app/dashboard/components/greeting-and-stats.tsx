"use client"

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
    <div className="mx-auto mt-2 flex max-w-screen-xl items-center justify-between gap-8 px-5">
      <h1 className="max-w-md text-xl font-medium">
        Bem-vindo {person?.name}. Vamos fazer uma nova coleta?
      </h1>

      <div>
        <Card className="flex items-center justify-center gap-4 border-none">
          <span className="rounded-xl bg-accent p-5">
            <ArchiveRestoreIcon size={26} />
          </span>
          <div className="flex flex-col justify-between gap-4">
            <h3 className="opacity-75 text-sm">Quilos coletado</h3>
            <p className="text-xl font-medium">
              {person?.recycler?.map((recycler) => recycler.kgRecycled)} Kg
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};
