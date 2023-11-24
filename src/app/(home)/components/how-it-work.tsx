import React from "react";
import Image from "next/image";

interface StepProps {
  number: number;
  title: string;
  description: string;
  imageSrc: string;
  order?: string;
}

const Step = ({ number, title, description, imageSrc, order }: StepProps) => (
  <div className="flex flex-col items-center justify-center gap-8 px-5 md:flex-row">
    <div className={`mt-12 flex max-w-sm flex-col gap-2 ${order || ""}`}>
      <span className="text-xs text-primary">Passo {number}</span>
      <h3 className="text-lg font-bold">{title}</h3>
      <p className="text-sm opacity-75">{description}</p>
    </div>
    <Image
      src={imageSrc}
      width={0}
      height={0}
      sizes="100vw"
      style={{
        objectFit: "contain",
      }}
      alt="Waves Sustentabilidades"
      className="mt-4 h-full max-h-[200px] w-full"
    />
  </div>
);

export const HowItWork = () => {
  return (
    <section className="relative mt-52" id="#about">
      <h2 className="text-center text-2xl font-bold text-primary">
        Como funcionamos
      </h2>

      <span className="top-4/4 absolute -z-10 w-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1418"
          height="513"
          viewBox="0 0 1418 513"
          fill="none"
          className=" -z-10 w-full"
        >
          <path
            d="M0 513.533C0 513.533 21.0883 338.692 63.8889 338.692C91.3972 338.692 105.394 427.439 112.693 453.592C127.261 505.783 189.004 587.47 300.809 385.654C425.591 160.408 617.176 131.767 794.169 228.792C963.663 321.705 1220.12 315.721 1330.12 185.831C1428.22 70.007 1418.86 0 1418.86 0"
            stroke="#00B4FC"
            strokeOpacity="0.09"
            strokeWidth="3"
          />
        </svg>
      </span>

      <div className="mt-8 flex flex-col items-center justify-center gap-16">
        <Step
          number={1}
          title="Coleta Consciente"
          description="Na Waves, acreditamos na importância da coleta consciente como ponto de partida para a sustentabilidade. Promovemos a conscientização sobre a separação adequada de resíduos e incentivamos práticas eco-friendly. A coleta consciente é o primeiro passo para um futuro mais sustentável."
          imageSrc={"/banner-home.webp"}
        />

        <Step
          number={2}
          title="Reciclagem Responsável"
          description="Comprometemo-nos com a reciclagem responsável como parte fundamental do nosso processo. Trabalhamos para desenvolver soluções inovadoras que minimizem o impacto ambiental e promovam a reutilização de materiais. A reciclagem responsável é a nossa contribuição para a preservação do planeta."
          imageSrc={"/banner-home.webp"}
          order="md:order-1"
        />

        <Step
          number={3}
          title="Envolvimento Comunitário"
          description="Na Waves, entendemos que a mudança real ocorre quando a comunidade se une. Encorajamos o envolvimento comunitário, promovendo a educação ambiental e apoiando projetos locais. Através do nosso compromisso com a comunidade, buscamos criar um impacto duradouro e inspirar outros a se juntarem à nossa jornada sustentável."
          imageSrc={"/banner-home.webp"}
        />
      </div>
    </section>
  );
};
