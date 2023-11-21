"use client";

import { getCollectors } from "@/app/actions/getCollectors";
import { getCoordinatesFromCEP } from "@/app/actions/coordinates/getCoordinatesFromCep";
import { Card } from "@/components/ui/card";
import { MapPinIcon } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { haversineDistance } from "@/app/actions/coordinates/haversineDistance";

export interface Collector extends Person {
  id: string;
  collectionServiceDescription: string;
  kgCollected: number;
  marketTime: string;
  organization: string;
  cpfCnpj: string;
  isoCertification: boolean;
  purchases: string;
  biography: string;
  personId: string;
}

export interface Person extends User {
  id: string;
  name: string;
  phone: string;
  cpfCnpj: string;
  sex: string;
  birthDate: Date;
  uf: string;
  city: string;
  cep: string;
  timeInMarket: string;
  userId: string;
  collector: Collector[];
}

export interface User {
  id: string;
  name?: string;
  email: string;
  image: string;
  person: Person[];
}

export default function CollectorList() {
  const [users, setUsers] = useState<User[]>([]);
  const [distancesCalculated, setDistancesCalculated] = useState(false);
  const [distances, setDistances] = useState<Record<string, number>>({});

  let personZipCode: string = "72800-200";

  useEffect(() => {
    async function fetchCollectors() {
      try {
        // Explicitly specify the type of getUserWithCollector as User[]
        const getUserWithCollector: User[] = await getCollectors();
        setUsers(getUserWithCollector);
      } catch (error) {
        console.error("Error fetching collectors:", error);
      }
    }

    fetchCollectors();
  }, []);

  async function calculateDistances() {
    if (distancesCalculated) return;

    const distancesObject: Record<string, number> = {};

    await Promise.all(
      users.map(async (user) => {
        await Promise.all(
          user.person.map(async (associatedPerson) => {
            await Promise.all(
              associatedPerson.collector.map(async (collector) => {
                const zipCodeUser1 = associatedPerson.cep;
                const zipCodeUser2 = personZipCode;

                const coordinatesUser1 =
                  await getCoordinatesFromCEP(zipCodeUser1);
                const coordinatesUser2 =
                  await getCoordinatesFromCEP(zipCodeUser2);

                const distance = haversineDistance(
                  coordinatesUser1.latitude,
                  coordinatesUser1.longitude,
                  coordinatesUser2.latitude,
                  coordinatesUser2.longitude,
                );

                distancesObject[collector.id] = Number(distance);
              }),
            );
          }),
        );
      }),
    );

    setDistances(distancesObject);
    setDistancesCalculated(true);
  }

  useEffect(() => {
    calculateDistances();
  }, [users]);

  return (
    <div className="mx-auto flex max-w-screen-xl flex-col gap-4 px-5">
      {users.map((user) => (
        <Card key={user.id} className="flex max-w-xl items-center gap-4 p-4">
          <Image
            src={user.image}
            width={0}
            height={0}
            sizes="100vw"
            className="h-full w-full max-w-[50px] rounded-full bg-contain"
            alt={""}
          />

          <div>
            <span className="text-sm">Catador</span>
            <h2 className="text-lg font-bold">{user.name ?? "Unknown"}</h2>

            {user.person.map((associatedPerson) => (
              <ul key={associatedPerson.id}>
                {associatedPerson.collector.map((collector) => (
                  <li key={collector.id}>
                    <p className="mt-2 text-xs text-accent-foreground">
                      Organização:
                    </p>
                    <h4 className="text-sm font-semibold">
                      {collector.organization}
                    </h4>
                    <p className="mt-2 text-xs text-accent-foreground opacity-80">
                      {collector.collectionServiceDescription ||
                        "Faço coletas!"}
                    </p>
                    <p className="mt-4 flex items-center gap-2 text-sm font-semibold">
                      <span>
                        <MapPinIcon
                          color={
                            collector.personId !== user.id &&
                            distances[collector.id] > 5
                              ? "red"
                              : "green"
                          }
                          size={24}
                        />{" "}
                      </span>
                      {collector.personId !== user.id &&
                        `Aproximadamente ${distances[collector.id]} km`}
                    </p>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
}
