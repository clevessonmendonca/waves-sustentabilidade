import Image from "next/image";
import { Collections } from "../../../components/ui/components/collections";
import { Map } from "../../../components/ui/components/maps";
import { prismaClient } from "@/lib/prisma";

export default async function Home({ params }: any) {
  const user = await prismaClient.user.findFirst({
    where: {
      id: params.id,
    },
    include: {
      recyclers: true,
    },
  });

  if (!user) return null;

  return (
    <div>
      <Image
        src="/banner-home.webp"
        width={0}
        height={0}
        sizes="100vw"
        style={{
          objectFit: "contain",
        }}
        alt="Waves Sustentabilidades"
        className="h-auto w-full rounded-lg px-5"
      />

      <Collections />

      <div className="mt-5 w-full">
        <Map />
      </div>
    </div>
  );
}
