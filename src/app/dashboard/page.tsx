"use client";

import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../providers/user";
import { getCollector } from "../actions/getCollector";
import { Collector } from "@/@types/User";
import { Collections } from "./components/collections";
import { Map } from "./components/maps";
import { Card } from "@/components/ui/card";
import { GreetingAndStats } from "./components/greeting-and-stats";
import { HistoryStats } from "./components/history-stats";
import { CollectionState } from "./components/collection-state";
import { Separator } from "@/components/ui/separator";
import Loading from "../loading";
import { Schedules } from "./components/schedules";
import { useRouter } from "next/navigation";
import { VerifyProfile } from "../actions/verifyProfile";

export default function Dashboard() {
  const userContext = useContext(UserContext);
  const router = useRouter();
  const [collector, setCollector] = useState<Collector | null>(null);

  useEffect(() => {
    if (!userContext) {
      router.push("/");
      return;
    }

    const { userData } = userContext;

    const fetchCollector = async () => {
      try {
        if (userData) {
          const verified = await VerifyProfile(userData.userId);
          if (!verified) {
            console.error("Profile not verified.");
            return router.push("/signin/recycle");
          }

          const fetchedCollector = await getCollector(userData.id);

          if (fetchedCollector) {
            setCollector(fetchedCollector);
          } else {
            console.error("Collector not found.");
          }
        }
      } catch (error) {
        console.error("Error fetching collector:", error);
      }
    };

    fetchCollector();
  }, [router, userContext]);

  if (!userContext) {
    return <Loading />;
  }

  return (
    <div>
      <GreetingAndStats collector={collector} />
      <div className="mx-auto my-6 max-w-screen-xl px-5">
        <CollectionState collector={collector} />
      </div>

      <Separator className="mx-auto my-4 max-w-screen-xl px-5" />

      <div className="mx-auto mb-12 grid w-full max-w-screen-xl grid-cols-1 items-center justify-center gap-6 px-5 md:grid-cols-3">
        <Card className="h-full max-h-[400px] w-full bg-card">
          {collector ? <Schedules /> : <Collections />}
        </Card>
        <Card className="maxh-[600px] h-full w-full bg-card md:max-h-[400px]">
          <HistoryStats />
        </Card>
        <Card className="h-full max-h-[400px] w-full overflow-hidden bg-accent">
          <Map />
        </Card>
      </div>
    </div>
  );
}
