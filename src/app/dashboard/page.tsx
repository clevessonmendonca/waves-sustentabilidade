"use client";

import Image from "next/image";
import { Collections } from "../../components/ui/components/collections";
import { Map } from "../../components/ui/components/maps";
import { UserContext } from "../providers/user";
import Loading from "../loading";
import { useContext } from "react";
import { Banner } from "./components/banner";

export default function Home() {
  const userData = useContext(UserContext);

  if (!userData) {
    return <Loading />;
  }

  return (
    <div>
      <div className="mx-auto max-w-[1920px] overflow-hidden max-h-[380px]">
        <Banner
          src="/banner-home.webp"
          className="h-auto w-full"
          alt="Waves Sustentabilidades"
        />
      </div>

      <Collections />

      <div className="mt-5 w-full">
        <Map />
      </div>
    </div>
  );
}
