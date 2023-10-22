"use client";

import React, { useEffect } from "react";
import { Card } from "./card";
import { Button } from "./button";
import { HomeIcon, LogOutIcon, MenuIcon, ShellIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "./sheet";
import { signIn, signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { Separator } from "./separator";
import { useRouter } from "next/navigation";

export const Header = () => {
  const router = useRouter();
  const { status, data } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      return router.push("/");
    }
  }, [router, status]);

  const handleLoginClick = async () => {
    await signIn("google", { callbackUrl: "/dashboard" });
  };

  const handleLogoutClick = async () => {
    await signOut();
  };

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

      <div className="flex items-center justify-center gap-4">
        {status === "unauthenticated" && (
          <Button className="font-semibold" onClick={handleLoginClick}>
            Cadastrar
          </Button>
        )}

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

            <div className="mt-4 flex h-full flex-col justify-between gap-2 pb-16">
              <div className="flex flex-col gap-2">
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

              <div className="flex flex-col gap-2">
                {status === "authenticated" && data?.user && (
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2 py-4">
                      <Avatar>
                        <AvatarFallback>
                          {data.user.name?.[0].toUpperCase()}
                        </AvatarFallback>

                        {data.user.image && (
                          <AvatarImage src={data.user.image} />
                        )}
                      </Avatar>

                      <div className="flex flex-col">
                        <p className="font-medium">{data.user.name}</p>
                        <p className="text-sm opacity-75">Reciclador</p>
                      </div>
                    </div>

                    <Separator />
                  </div>
                )}

                {status === "authenticated" && (
                  <Button
                    className="gap-2 font-semibold "
                    variant="outline"
                    onClick={handleLogoutClick}
                  >
                    <LogOutIcon size={16} />
                    Deslogar
                  </Button>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </Card>
  );
};
