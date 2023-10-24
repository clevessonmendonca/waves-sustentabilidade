import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
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
        className="absolute top-0 -z-10 h-auto w-full max-w-screen-2xl opacity-60"
      />

      <div className="mt-8 flex flex-col items-center justify-center gap-2">
        <h1 className="max-w-md px-5 text-center text-3xl font-bold">
          Salvando Nossos Oceanos! <span className="text-primary">Juntos</span>{" "}
          Pela Reciclagem Marinha
        </h1>
        <p className="max-w-sm text-center text-xs opacity-75">
          Unindo Forças para Limpar e Proteger os Tesouros Subaquáticos do Nosso
          Planeta
        </p>

        <div className="mt-5 flex gap-4">
          <Button>Sou um Coletador</Button>
          <Button>Sou um Reciclador</Button>
        </div>
      </div>
    </div>
  );
}
