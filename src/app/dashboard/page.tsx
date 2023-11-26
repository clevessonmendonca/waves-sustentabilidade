"use client";

import { Collections } from "./components/collections";
import { Map } from "./components/maps";
import { UserContext } from "../providers/user";
import Loading from "../loading";
import { useContext } from "react";

export default function Home() {
  const userData = useContext(UserContext);

  if (!userData) {
    return <Loading />;
  }

  const person = userData.userData;
  console.log(person);
  return (
    <div>
      <div className="flex justify-between gap-8">
        <h1 className="max-w-md text-2xl font-medium">
          Bem-vindo <span>{person?.name}</span>. Vamos fazer uma nova coleta?
        </h1>

        <div>
          <div>
            <h3>Kg coletado</h3>
            <p>{person?.recycler?.map((recycler) => recycler.kgRecycled)}</p>
          </div>
        </div>
      </div>
      <Collections />

      <div className="mt-5 w-full">
        <Map />
      </div>
    </div>
  );
}
