"use client";

import { getUserByEmail } from "@/app/actions/getUserByEmail";
import { RecyclerForm } from "./components/recycle-form";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { VerifyProfile } from "../actions/verifyProfile";
import { useRouter } from "next/navigation";
import { useUser } from "../providers/user";

export interface User {
  id: string;
  name: string;
  organization: string;
  phone: string;
  cpfCnpj: string;
  cep: string;
  isoCertification: boolean;
  marketTime: string;
  recyclingServiceDescription: string;
  kgRecycled: number;
  socialDonations: boolean;
  donationDetails: string;
}

export default function DashboardSignin() {
  const { data: session } = useSession();
  const router = useRouter();
  const user = session?.user;
  const { userData } = useUser();

  async function getUser() {
    if (!session) return;

    const verified = await VerifyProfile((user as any).id);
    if (verified) return router.push(`/dashboard`);
  }

  useEffect(() => {
    getUser();
  });

  return (
    <div className="mx-auto max-w-screen-md px-5">
      <div className="flex flex-col gap-1">
        <h2 className="max-w-md text-2xl font-bold md:text-3xl">
          Bem-vindo <span className="text-primary">{user?.name}</span>
        </h2>
        <p className="text-sm opacity-75">
          Por favor, preencha o formulario para finalizar o cadastro.
        </p>
      </div>

      <Separator className="mb-8 mt-4" />

      <div className="mb-8">{session?.user?.email && <RecyclerForm />}</div>
    </div>
  );
}
