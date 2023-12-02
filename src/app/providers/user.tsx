// Seu componente principal
"use client";

import React, { createContext, ReactNode } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Person } from "@/@types/User";
import { useUserData } from "../actions/useUserData";
import Loading from "@/app/loading";

interface UserContextData {
  userData: Person | null;
  loading: boolean;
  error: string | null;
}

export const UserContext = createContext<UserContextData | undefined>(
  undefined,
);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { data: session } = useSession();

  const { userData, loading, error } = useUserData(session?.user?.id || "");

  if (loading) {
    return <Loading />;
  }

  if (error) {
    console.error("Error:", error);
  }

  return (
    <UserContext.Provider value={{ userData, loading, error }}>
      {children}
    </UserContext.Provider>
  );
};
