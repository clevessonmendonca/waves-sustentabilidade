"use client";

import { getUserByEmail } from "@/app/actions/getUserByEmail";
import { RecyclerForm } from "./components/user-auth-form";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { VerifyProfile } from "../actions/verifyProfile";
import { useRouter } from "next/navigation";

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
  const [user, setUser] = useState<User>();
  const router = useRouter();

  async function getUser() {
    if (!session?.user?.email || !session) return;

    await getUserByEmail(session?.user?.email).then(async (user) => {
      setUser(user);

      const verified = await VerifyProfile(user);

      if (verified) return router.push(`/dashboard/${user.id}`);
    });
  }

  useEffect(() => {
    getUser();
  });

  if (!user) return;

  return (
    <div>
      <div className="flex flex-col gap-1 px-5">
        <h2 className="text-semibold text-xl">
          Bem-vindo <span className="text-primary">{user.name}</span>
        </h2>
        <p className="text-sm opacity-75">
          Por favor, preencha o formulario para finalizar o cadastro.
        </p>
      </div>

      <Separator className="m-8 px-5" />

      <div>{session?.user?.email && <RecyclerForm user={user} />}</div>
    </div>
  );
}
