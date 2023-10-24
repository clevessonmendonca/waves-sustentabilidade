"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import Map from "./components/maps";
import { Collections } from "./components/collections";

export default function Home() {
  const { data } = useSession();

  return (
    <div>
      <Image
        src={"/banner-home.webp"}
        width={0}
        height={0}
        sizes="100vw"
        style={{
          objectFit: "contain",
        }}
        alt="Waves Sustentabilidades"
        className="h-auto w-full rounded-lg px-5"
      />

      <Collections />

      <div className="mt-5">
        <Map />
      </div>
    </div>
  );
}
