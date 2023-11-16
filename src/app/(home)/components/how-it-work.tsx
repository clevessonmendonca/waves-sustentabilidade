import React from "react";
import Image from "next/image";

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
            stroke-opacity="0.09"
            stroke-width="3"
          />
        </svg>
      </span>

      <div className="mt-8 flex flex-col items-center justify-center gap-16">
        <div className="flex flex-col items-center justify-center gap-8 px-5 md:flex-row">
          <div className="mt-12 flex max-w-sm flex-col gap-2">
            <span className="text-xs text-primary">Passo 1</span>
            <h3 className="text-lg font-bold">Coleta Consciente</h3>
            <p className="text-sm opacity-75 ">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla,
              debitis eum natus ullam at temporibus quo aspernatur quasi earum
              distinctio perferendis expedita dolores quisquam aut ipsum cum
              neque sint. Placeat.
            </p>
          </div>

          <Image
            src={"/banner-home.webp"}
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

        <div className="flex flex-col items-center justify-center gap-8 px-5 md:flex-row">
          <div className="mt-12 flex max-w-sm flex-col gap-2 md:order-2">
            <span className="text-xs text-primary">Passo 1</span>
            <h3 className="text-lg font-bold">Coleta Consciente</h3>
            <p className="text-sm opacity-75 ">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla,
              debitis eum natus ullam at temporibus quo aspernatur quasi earum
              distinctio perferendis expedita dolores quisquam aut ipsum cum
              neque sint. Placeat.
            </p>
          </div>

          <Image
            src={"/banner-home.webp"}
            width={0}
            height={0}
            sizes="100vw"
            style={{
              objectFit: "contain",
            }}
            alt="Waves Sustentabilidades"
            className="mt-4 h-full max-h-[200px] w-full md:order-1"
          />
        </div>

        <div className="flex flex-col items-center justify-center gap-8 px-5 md:flex-row">
          <div className="mt-12 flex max-w-sm flex-col gap-2">
            <span className="text-xs text-primary">Passo 1</span>
            <h3 className="text-lg font-bold">Coleta Consciente</h3>
            <p className="text-sm opacity-75 ">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla,
              debitis eum natus ullam at temporibus quo aspernatur quasi earum
              distinctio perferendis expedita dolores quisquam aut ipsum cum
              neque sint. Placeat.
            </p>
          </div>

          <Image
            src={"/banner-home.webp"}
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
      </div>
    </section>
  );
};
