"use client";

import { Collections } from "../../components/ui/components/collections";
import { Map } from "../../components/ui/components/maps";
import { UserContext } from "../providers/user";
import Loading from "../loading";
import { useContext } from "react";

export default function Home() {
  const userData = useContext(UserContext);

  if (!userData) {
    return <Loading />;
  }

  return (
    <div>
      <Collections />

      <div className="mt-5 w-full">
        <Map />
      </div>
    </div>
  );
}
