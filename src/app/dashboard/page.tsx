"use client";

import Image from "next/image";
import { Collections } from "../../components/ui/components/collections";
import { Map } from "../../components/ui/components/maps";
import { UserContext } from "../providers/user";
import Loading from "../loading";
import { useContext } from "react";

export default function Home() {
  const { userData } = useContext(UserContext);

  if (!userData) {
    return <Loading />;
  }

  return (
    <div>
      <div className="flex justify-center">
        <Image
          src={"/banner-home.webp"}
          width={0}
          height={0}
          sizes="100vw"
          style={{
            objectFit: "cover",
          }}
          alt="Waves Sustentabilidades"
          className="h-screen max-h-[50vh] w-full max-w-screen-2xl"
        />
      </div>

      <Collections />

      <div className="mt-5 w-full">
        <Map />
      </div>
    </div>
  );
}
