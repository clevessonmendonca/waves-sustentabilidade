import { Button } from "@/components/ui/button";
import Image from "next/image";
import { HowItWork } from "./components/how-it-work";
import { ArrowRightIcon } from "lucide-react";

export default function Home() {
  return (
    <div>
      <div className="relative">
        <div>
          <Image
            src={"/banner-home.webp"}
            width={0}
            height={0}
            sizes="100vw"
            style={{
              objectFit: "cover",
            }}
            alt="Waves Sustentabilidades"
            className="absolute -top-40 -z-20 h-screen max-h-[80vh] w-full max-w-screen-2xl opacity-60"
          />

          <span className="absolute -z-10 h-screen max-h-[80vh] w-full max-w-screen-2xl bg-gradient-to-b from-transparent from-30% via-background to-background" />
        </div>

        <div className="mt-12 flex flex-col items-center justify-center gap-2 px-5">
          <h1 className="max-w-md px-5 text-center text-3xl font-bold drop-shadow-md">
            Seja uma <span className="text-primary">Ponte</span> para salvar os
            Oceanos!
          </h1>
          <p className="max-w-sm text-center text-xs opacity-75">
            Unindo Forças para Limpar e Proteger os Tesouros Subaquáticos do
            Nosso Planeta
          </p>

          <div className="mt-5 flex gap-4">
            <Button className="shadow-lg">Salve o oceano</Button>
            <Button
              variant="outline"
              className="flex gap-2 border-none bg-transparent shadow-md"
            >
              Saiba mais
              <ArrowRightIcon size={12} />
            </Button>
          </div>
        </div>
      </div>

      <HowItWork />

      <div>
        <div></div>
      </div>
    </div>
  );
}
