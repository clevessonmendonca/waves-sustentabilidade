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
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const userData = useContext(UserContext);
  const router = useRouter();
  const { status } = useSession();
  const [collector, setCollector] = useState<Collector | null>(null);
  const [loading, setLoading] = useState(true);
  console.log(userData);

  useEffect(() => {
    const fetchCollectorOrRecycle = async () => {
      if (!userData?.userData) return;

      try {
        const fetchedCollector = await getCollector(userData.userData.id);

        if (fetchedCollector) {
          setCollector(fetchedCollector);
        } else {
          console.error("Collector not found.");
        }
      } catch (error) {
        console.error("Error fetching collector:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCollectorOrRecycle();
  }, [userData]);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status]);

  if (loading) {
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
