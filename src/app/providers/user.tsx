"use client";

import React, { createContext, ReactNode, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { getUser } from "../actions/getUser";
import { Person } from "@/@types/User";

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

  useEffect(() => {
    const fetchUserData = async () => {
      if (userData) {
        return;
      }

      if (status === "authenticated" && session?.user?.id) {
        try {
          const user = await getUser(session.user.id);

          if (user) {
            setUserData(user as Person | null);
          } else {
            console.warn("User data not available.");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUserData();
  }, [session, status, userData]);

  return (
    <UserContext.Provider value={{ userData }}>{children}</UserContext.Provider>
  );
};
