import { Button } from "@/components/ui/button";
import Image from "next/image";
import { HowItWork } from "./components/how-it-work";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

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
        <div className="mt-12 flex flex-col justify-center gap-8 md:flex-row">
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

      <section className="mx-auto mt-32 max-w-7xl ">
        <div className="relative isolate overflow-hidden bg-gray-900 px-6 pt-16 shadow-2xl sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
          <svg
            viewBox="0 0 1024 1024"
            className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0"
            aria-hidden="true"
          >
            <circle
              cx="512"
              cy="512"
              r="512"
              fill="url(#759c1415-0410-454c-8f7c-9a820de03641)"
              fill-opacity="0.7"
            />
            <defs>
              <radialGradient id="759c1415-0410-454c-8f7c-9a820de03641">
                <stop stop-color="#7775D6" />
                <stop offset="1" stop-color="#7774D6" />
              </radialGradient>
            </defs>
          </svg>

          <div className="flex max-w-md flex-col justify-center text-center md:text-left">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Torna-se parte dessa Onda
            </h2>
            <p className="mb-8 opacity-95">
              Faça parte do nosso movimento de sustentabilidade. Ajude a
              preservar o meio ambiente e aumentar a reciclagem.
            </p>

            <Link href="/">
              <Button size="lg">Cadastra-se Agora</Button>
            </Link>
            <span className="mt-2 text-xs opacity-75">
              +300 usuários cadastrados.
            </span>
          </div>

          <div className="relative mt-16 h-80 lg:mt-8">
            <Image
              className="absolute -left-1/4 -top-1/4 z-10 w-[40rem] max-w-none sm:-top-2/4 sm:w-[57rem] "
              src="/shots.png"
              alt="App screenshot"
              width={0}
              height={0}
              sizes="100vw"
              style={{
                objectFit: "contain",
              }}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
