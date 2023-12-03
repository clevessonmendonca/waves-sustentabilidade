"use client"

import React, { createContext, ReactNode, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Person } from "@/@types/User";
import { useUserData } from "../actions/useUserData";
import Loading from "@/app/loading";

interface UserContextData {
  userData: Person | null;
  loading: boolean;
  error: string | null;
  update: () => Promise<void>;
}

export const UserContext = createContext<UserContextData | undefined>(
  undefined,
);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { data: session } = useSession();
  const { data, loading, error, update } = useUserData(session?.user?.id || "");
  const router = useRouter();

  useEffect(() => {
    if (!session && (error || !data)) {
      router.push("/signin/recycle");
    }
  }, [session, error, data, router]);

  useEffect(() => {
    if (session) {
      update();
    }
  }, []);
console.log(loading)
  if (loading) {
    return <Loading />;
  }

  if (error) {
    console.error("Error:", error);
  }

  return (
    <UserContext.Provider value={{ userData: data, loading, error, update }}>
      {children}
    </UserContext.Provider>
  );
}
