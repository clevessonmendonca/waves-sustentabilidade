"use client";

import { useEffect, useState } from "react";
import { getUser } from "../actions/getUser";
import { Person } from "@/@types/User";

export function useUserData(userId: string) {
  const [userData, setUserData] = useState<Person | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await getUser(userId);
        setUserData(user as Person | null);
        setError(null);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Error fetching user data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  });

  return {
    data: userData,
    loading,
    error,
    update: async () => {
      try {
        setLoading(true);
        const user = await getUser(userId);
        setUserData(user as Person | null);
        setError(null);
      } catch (error) {
        console.error("Error updating user data:", error);
        setError("Error updating user data");
      } finally {
        setLoading(false);
      }
    },
  };
}
