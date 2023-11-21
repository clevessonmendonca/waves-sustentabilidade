"use client";

import { Collections } from "../../components/ui/components/collections";
import { Map } from "../../components/ui/components/maps";
import { UserContext } from "../providers/user";
import Loading from "../loading";
import { useContext } from "react";
import { Banner } from "./components/banner";
import Chat from "@/components/ui/chat";

export default function Home() {
  const userData = useContext(UserContext);

  if (!userData) {
    return <Loading />;
  }

  return (
    <div>
      <div className="mx-auto max-h-[380px] max-w-[1920px] overflow-hidden">
        <Banner
          src="/banner-home.webp"
          className="h-auto w-full"
          alt="Waves Sustentabilidades"
        />
      </div>

      <Collections />

      {/* <Chat /> */}

      <div className="mt-5 w-full">
        <Map />
      </div>
    </div>
  );
}
