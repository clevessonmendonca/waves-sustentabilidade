import { Button } from "@/components/ui/button";
import Image from "next/image";
import { HowItWork } from "./components/how-it-work";
import { ArrowRightIcon } from "lucide-react";

export default function Home() {
  return (
    <div>
      <div className="relative">
        <div className="flex justify-center">
          <Image
            src={"/banner-home.webp"}
            width={0}
            height={0}
            sizes="100vw"
            style={{
              objectFit: "cover",
            }}
            alt="Waves Sustentabilidades"
            className="absolute -top-40  -z-20 h-screen max-h-[80vh] w-full max-w-screen-2xl opacity-60"
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

      <section className="mx-auto mt-32 max-w-screen-lg px-5">
        <span className="text-xs text-primary">Nosso Impacto</span>
        <h2 className="max-w-md text-3xl font-bold md:text-4xl">
          Comprometidos com um mundo mais sustentável
        </h2>
        <p className="mt-2 max-w-md text-sm opacity-75">
          Na Waves Sustentabilidade, nosso trabalho árduo resulta em impactos
          positivos para o meio ambiente e a comunidade. Aqui estão alguns dos
          nossos números:
        </p>
        <div className="mt-8 flex flex-col justify-center gap-8 md:flex-row">
          <div className="flex flex-col justify-center gap-2 border-l-2 px-5 py-1">
            <h3 className="text-2xl font-bold">Mais de 2.000</h3>
            <p className="text-sm">Kilogramas reciclados</p>
          </div>
          <div className="flex flex-col justify-center gap-2 border-l-2 px-5 py-1">
            <h3 className="text-2xl font-bold">100%</h3>
            <p>Compromisso sustentável</p>
          </div>
          <div className="flex flex-col justify-center gap-2 border-l-2 px-5 py-1">
            <h3 className="text-2xl font-bold">2+</h3>
            <p>Parcerias com comunidades</p>
          </div>
          <div className="flex flex-col justify-center gap-2 border-l-2 px-5 py-1">
            <h3 className="text-2xl font-bold">20.000+</h3>
            <p>Usuários satisfeitos</p>
          </div>
        </div>
      </section>
    </div>
  );
}
