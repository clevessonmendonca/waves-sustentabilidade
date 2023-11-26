"use client";

import React, { createContext, ReactNode, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { getUser } from "../actions/getUser";
import { Person } from "@/@types/User";

interface UserContextType {
  userData: Person | null;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined,
);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { data: session, status } = useSession();
  const [userData, setUserData] = useState<Person | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (status === "authenticated" && session?.user?.id) {
        try {
          const user = await getUser(session.user.id);

          if (!user) return;

          setUserData(user as Person | null);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    if (userData) return;

    fetchUserData();
  }, [session, status, userData]);

  return (
    <UserContext.Provider value={{ userData }}>{children}</UserContext.Provider>
  );
};
