import { Collections } from "./components/collections";
import { Map } from "./components/maps";
import { Card } from "@/components/ui/card";
import { GreetingAndStats } from "./components/greeting-and-stats";
import { HistoryStats } from "./components/history-stats";
import { CollectionState } from "./components/collection-state";

export default function Home() {
  return (
    <div>
      <GreetingAndStats />

      <div className="mx-auto my-6 max-w-screen-xl px-5">
        <CollectionState />
      </div>

      <div className="mx-auto mb-12 grid w-full max-w-screen-xl grid-cols-1 items-center justify-center gap-6 px-5 md:grid-cols-3">
        <Card className="h-full max-h-[350px] w-full max-w-[400px] bg-card ">
          <Collections />
        </Card>
        <Card className="h-full max-h-[350px] w-full max-w-[400px] bg-card">
          <HistoryStats />
        </Card>
        <Card className="h-full max-h-[350px] w-full max-w-[400px] overflow-hidden bg-accent">
          <Map />
        </Card>
      </div>
    </div>
  );
}
