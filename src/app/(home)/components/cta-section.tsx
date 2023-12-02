import { Button } from "@/components/ui/button";
import { handleLoginClick } from "@/components/ui/header";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const CTASection = () => {
  return (
    <section className="mx-auto mt-32 max-w-7xl">
      <div className="relative flex w-full flex-col items-center justify-center overflow-hidden bg-gray-900 px-6 pb-80 pt-16 shadow-2xl sm:rounded-3xl sm:px-16 md:flex-row md:pb-0 md:pt-0 lg:gap-x-20 lg:px-24">
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
            fillOpacity="0.7"
          />
          <defs>
            <radialGradient id="759c1415-0410-454c-8f7c-9a820de03641">
              <stop stopColor="#7775D6" />
              <stop offset="1" stopColor="#7774D6" />
            </radialGradient>
          </defs>
        </svg>
        <div className="flex w-full max-w-md flex-col justify-center text-center md:text-left">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Torna-se parte dessa Onda
          </h2>
          <p className="mb-8 opacity-95">
            Faça parte do nosso movimento de sustentabilidade. Ajude a preservar
            o meio ambiente e aumentar a reciclagem.
          </p>

          <div>
            <Button onClick={handleLoginClick} size="lg">
              Cadastra-se Agora
            </Button>
          </div>

          <span className="mt-2 text-xs opacity-75">
            +300 usuários cadastrados.
          </span>
        </div>
        <span className="block w-[40rem] overflow-hidden md:h-80">
          <Image
            className="md:right-0-0 absolute -bottom-28 w-[40rem] max-w-none md:-top-28 md:bottom-0 md:w-[57rem]"
            src="/shots.png"
            alt="App screenshot"
            width={1368}
            height={400}
            sizes="100vw"
            style={{
              objectFit: "contain",
            }}
          />
        </span>
      </div>
    </section>
  );
};
