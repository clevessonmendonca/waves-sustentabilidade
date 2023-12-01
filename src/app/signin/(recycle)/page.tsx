"use client";

import { RecyclerForm } from "./components/RecyclerForm";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import { VerifyProfile } from "../../actions/verifyProfile";
import { useRouter } from "next/navigation";

export default function DashboardSignin() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    async function getUser() {
      if (!session?.user) return;

      const verified = await VerifyProfile(session.user.id);
      if (!verified) return;

      router.push(`/dashboard`);
    }

    getUser();
  });

  if (status === "unauthenticated") return router.push(`/`);

  return (
    <div className="mx-auto max-w-screen-md px-5">
      <div className="flex flex-col gap-1">
        <h2 className="max-w-md text-2xl font-bold md:text-3xl">
          Bem-vindo <span className="text-primary">{session?.user?.name}</span>
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
