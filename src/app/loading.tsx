import { Loader2Icon } from "lucide-react";
import React from "react";

export default function Loading() {
  return (
    <div className="flex h-[80%] w-full flex-col items-center justify-center gap-4">
      <Loader2Icon className="h-4 w-4 animate-spin" />
      <h4 className="text-xl font-bold">Carregando...</h4>
    </div>
  );
}
