"use client";

import React, { createContext, ReactNode, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { getUser } from "../actions/getUser";
import { Person } from "@/@types/User";
import { getRecycler } from "../actions/getRecycler";

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

          if (user.recycler.length > 0) {
            const recycler = await getRecycler(user.id);

            if (recycler)
              return setUserData(
                user.recycler.push(recycler) as unknown as Person | null,
              );
          }

          setUserData(user as unknown as Person | null);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUserData();
  }, [session, status]);

  return (
    <UserContext.Provider value={{ userData }}>{children}</UserContext.Provider>
  );
};
