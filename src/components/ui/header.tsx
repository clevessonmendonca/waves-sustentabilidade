import React from "react";
import { Card } from "./card";
import { Button } from "./button";
import { HomeIcon, MenuIcon, ShellIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "./sheet";

export const Header = () => {
  return (
    <Card className="flex items-center justify-between gap-3 p-[1.875rem]">
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
          className="h-full w-[150px]"
        />
      </Link>

      <div className="flex gap-4 items-center justify-center">
        <Button className="font-semibold">Cadastrar</Button>

        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline">
              <MenuIcon />
            </Button>
          </SheetTrigger>

          <SheetContent>
            <SheetHeader className="text-left text-lg font-semibold">
              Menu
            </SheetHeader>

            <div className="mt-4 flex flex-col gap-2">
              <Button
                variant="outline"
                className="flex w-full justify-start gap-2 "
              >
                <HomeIcon size={16} />
                Início
              </Button>

              <Button
                variant="outline"
                className="flex w-full justify-start gap-2 "
              >
                <ShellIcon size={16} />
                Sobre
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </Card>
  );
};
