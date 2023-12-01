"use client";

import React, { createContext, ReactNode, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { getUser } from "../actions/getUser";
import { Person } from "@/@types/User";
import { useRouter } from "next/navigation";

interface UserContextData {
  userData: Person | null;
}

export const UserContext = createContext<UserContextData | undefined>(
  undefined,
);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { data: session, status } = useSession();
  const [userData, setUserData] = useState<Person | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (status === "unauthenticated") return router.push("/");
        if (!session?.user) return;

        const user = await getUser(session.user.id);

        if (user) {
          setUserData(user as Person | null);
        } else {
          return router.push("/signin");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if(userData) return

    fetchUserData();
  }, [router, session, status, userData]);

  return (
    <UserContext.Provider value={{ userData }}>{children}</UserContext.Provider>
  );
};
