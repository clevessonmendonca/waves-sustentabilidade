"use client";

import { Collections } from "./components/collections";
import { Map } from "./components/maps";
import { Card } from "@/components/ui/card";
import { GreetingAndStats } from "./components/greeting-and-stats";
import { HistoryStats } from "./components/history-stats";
import { CollectionState } from "./components/collection-state";
import { Separator } from "@/components/ui/separator";
import Loading from "../loading";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../providers/user";
import { getCollector } from "../actions/getCollector";
import { Collector } from "@/@types/User";
import { Schedules } from "./components/schedules";
import { getRecycler } from "../actions/getRecycler";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";

export default function Home() {
  const userData = useContext(UserContext);
  const router = useRouter();

  const [collector, setCollector] = useState<Collector | null>(null);

  useEffect(() => {
    const fetchCollectorOrRecycle = async () => {
      if (!userData?.userData) return

      const collector = await getCollector(userData.userData.id);

      if (!collector) return;

      setCollector(collector);
    };

    if (collector) return;

    fetchCollectorOrRecycle();
  }, [collector, userData]);

  if (!userData) {
    return <Loading />;
  }

  return (
    <div>
      <GreetingAndStats />
      <div className="mx-auto my-6 max-w-screen-xl px-5">
        <CollectionState collector={collector} />
      </div>

      <Separator className="mx-auto my-4 max-w-screen-xl px-5" />

      <div className="mx-auto mb-12 grid w-full max-w-screen-xl grid-cols-1 items-center justify-center gap-6 px-5 md:grid-cols-3">
        <Card className="h-full max-h-[400px] w-full bg-card ">
          {collector ? <Schedules /> : <Collections />}
        </Card>
        <Card className="h-full max-h-[400px] w-full bg-card">
          <HistoryStats />
        </Card>
        <Card className="h-full max-h-[400px] w-full overflow-hidden bg-accent">
          <Map />
        </Card>
      </div>
    </div>
  );
}
