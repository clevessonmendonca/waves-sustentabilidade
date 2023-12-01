"use client";

import React, { useEffect, useState } from "react";
import {
  BellDotIcon,
  HomeIcon,
  InfoIcon,
  LogOutIcon,
  MenuIcon,
  RecycleIcon,
  ShellIcon,
  User2Icon,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  SheetTrigger,
  SheetContent,
  SheetHeader,
  Sheet,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { getNotification } from "@/app/actions/getNotifications";
import { Notification } from "@prisma/client";
import { NotificationList } from "./notification-list";

export const handleLoginClick = async () => {
  await signIn("google", { callbackUrl: "/dashboard" });
};

export const handleLogoutClick = async () => {
  await signOut({ callbackUrl: "/" });
};

export const Header = () => {
  const router = useRouter();
  const { status, data } = useSession();
  const [notifications, setNotifications] = useState<Notification[] | null>(
    null,
  );

  useEffect(() => {
    if (status === "unauthenticated") {
      return router.push("/");
    }

    async function fetchNotification() {
      const notifications = await getNotification();

      setNotifications(notifications);
    }

    fetchNotification();
  }, [router, status]);

  return (
    <Card className="mx-auto flex w-full max-w-screen-xl items-center justify-between gap-3 border-none bg-transparent p-[1.875rem] shadow-none">
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
        {status === "unauthenticated" ? (
          <Button className="font-semibold" onClick={handleLoginClick}>
            Cadastrar
          </Button>
        ) : (
          <div className="flex gap-5">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <BellDotIcon />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel className="flex items-center justify-between gap-16 px-2">
                  Notificações{" "}
                  <Button className="px-0" variant="link">
                    Marcar todas como lidas.
                  </Button>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="flex flex-col gap-1 px-0 py-2">
                  <NotificationList />
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarFallback>
                    {data?.user.name?.[0].toUpperCase()}
                  </AvatarFallback>

                  {data?.user.image && <AvatarImage src={data.user.image} />}
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Minha conta</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link
                    href="dashboard/profile"
                    className="flex items-center gap-2"
                  >
                    <User2Icon /> Perfil
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator className="mt-2" />

                <DropdownMenuItem
                  onClick={handleLogoutClick}
                  className="flex items-center gap-2"
                >
                  <LogOutIcon /> Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}

        <Sheet>
          <SheetTrigger asChild>
            <Button
              size="icon"
              variant="outline"
              className="border-none bg-transparent drop-shadow-md"
            >
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

                <Separator />

                <Link href="/signin/collector">
                  <Button className="mt-2 flex w-full justify-center gap-2 ">
                    <RecycleIcon size={16} />
                    Torna-se Coletador
                  </Button>
                </Link>
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
