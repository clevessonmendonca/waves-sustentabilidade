import Image from "next/image";
import { HowItWork } from "./components/how-it-work";
import { ContactForm } from "./components/contact";
import { CTASection } from "./components/cta-section";
import { ImpactStat } from "./components/impact-stat";
import { HeroInfo } from "./components/hero-info";

export default function Home() {
  return (
    <div>
      <div className="relative">
        <div className="flex justify-center">
          <Image
            src={"/banner-home.png"}
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

        <HeroInfo />
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
        <div className="mt-12 flex flex-col gap-8 md:flex-row">
          <ImpactStat label="Kilogramas reciclados" value="Mais de 2.000" />
          <ImpactStat label="Compromisso sustentável" value="100%" />
          <ImpactStat label="Parcerias com comunidades" value="2+" />
          <ImpactStat label="Usuários satisfeitos" value="20.000+" />
        </div>
      </section>

      <CTASection />

      <section className="m-40 mx-auto flex max-w-screen-xl flex-col items-center justify-center gap-16 px-5 md:flex-row md:gap-8">
        <div className="flex w-full max-w-lg flex-col gap-2">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Contato
          </h2>
          <p className="mb-8 max-w-md text-sm opacity-95">
            Estamos sempre prontos para ouvir você! Seja para esclarecer
            dúvidas, receber feedback ou discutir oportunidades de parceria, o
            nosso time está à disposição. Procuramos construir relações sólidas
            e positivas com a nossa comunidade.
          </p>

          <div>
            <h3 className="text-xl font-semibold">Email</h3>
            <p className="text-primary">waves.contato@waves.com</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold">Contato</h3>
            <p className="text-primary">(61) 9 9999-9999</p>
          </div>
        </div>
        <div className="w-full flex-1 rounded-3xl bg-accent px-6 shadow-2xl sm:px-12">
          <ContactForm />
        </div>
      </section>
    </div>
  );
}
