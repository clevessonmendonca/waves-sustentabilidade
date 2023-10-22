import React from "react";
import { Card } from "./card";
import { Button } from "./button";
import { MenuIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export const Header = () => {
  return (
    <Card className="flex p-[1.875rem] justify-between items-center">
      <Link href={"/"}>
        <Image
          src={"/logo.png"}
          width={0}
          height={0}
          sizes="100vw"
          style={{
            objectFit: "contain",
          }}
          alt="Waves Sustentabilidades"
          className="w-[150px] h-full"
        />
      </Link>

      <Button size="icon" variant="outline">
        <MenuIcon />
      </Button>
    </Card>
  );
};
