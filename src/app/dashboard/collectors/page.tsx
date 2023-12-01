"use client";

import { getCollectors } from "@/app/actions/getCollectors";
import { getCoordinatesFromCEP } from "@/app/actions/coordinates/getCoordinatesFromCep";
import { Card } from "@/components/ui/card";
import {
  ArrowLeftIcon,
  MapPinIcon,
  MessageCircleIcon,
  PhoneIcon,
} from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { haversineDistance } from "@/app/actions/coordinates/haversineDistance";
import { Button } from "@/components/ui/button";
import { CollectorInfoDialog } from "./components/collector-info-dialog";
import { User } from "@/@types/User";
import { Person } from "@prisma/client";
import Link from "next/link";

export default function CollectorList() {
  const [users, setUsers] = useState<any[]>([]);
  const [distancesCalculated, setDistancesCalculated] = useState(false);
  const [distances, setDistances] = useState<Record<string, number>>({});
  const [selectedCollector, setSelectedCollector] = useState<User | null>(null);
  const [openModal, setOpenModal] = useState<boolean>(false);

  useEffect(() => {
    async function fetchCollectors() {
      try {
        const getUserWithCollector = await getCollectors();

        setUsers(getUserWithCollector);
        setDistancesCalculated(false);
      } catch (error) {
        console.error("Error fetching collectors:", error);
      }
    }

    fetchCollectors();
  }, []);

  async function calculateDistances() {
    if (distancesCalculated) return;

    // const distancesObject: Record<string, number> = {};

    // await Promise.all(
    //   users.map(async (user: ) => {
    //     await Promise.all(
    //       user.person.map(async (associatedPerson: any) => {
    //         await Promise.all(
    //           associatedPerson.collector.map(async (collector: any) => {
    //             const coordinatesUser1: any =
    //               await getCoordinatesFromCEP();
    //             const coordinatesUser2: any =
    //               await getCoordinatesFromCEP(zipCodeUser2);

    //             if (!coordinatesUser1 || !coordinatesUser2) return;

    //             const distance = haversineDistance(
    //               coordinatesUser1.latitude,
    //               coordinatesUser1.longitude,
    //               coordinatesUser2.latitude,
    //               coordinatesUser2.longitude,
    //             );

    //             distancesObject[collector.id] = Number(distance);
    //           }),
    //         );
    //       }),
    //     );
    //   }),
    // );

    // setDistances(distancesObject);
    // setDistancesCalculated(true);
  }

  useEffect(() => {
    calculateDistances();
  }, [users]);

  return (
    <div className="mx-auto flex max-w-screen-xl flex-col gap-4 px-5">
      <Link href="/dashboard">
        <Button variant="ghost" className="flex gap-3">
          <ArrowLeftIcon size={22} /> Voltar
        </Button>
      </Link>
      <div>
        <h2 className="text-2xl font-semibold">Para que esperar tanto!</h2>
        <p className="mb-4 text-sm opacity-75">
          Abaixo você pode mandar mensagem diretamente para algum coletador
          próximo de você.
        </p>

        <div className="flex flex-col gap-4">
          {users.map((user: any) => (
            <Card
              key={user.id}
              onClick={() => {
                setSelectedCollector(user);
                setOpenModal(true);
              }}
              className="flex max-w-xl cursor-pointer items-center gap-4 p-4"
            >
              <Image
                src={user.image}
                width={0}
                height={0}
                sizes="100vw"
                className="h-full w-full max-w-[80px] rounded-full bg-contain"
                alt={""}
              />

              <div>
                <span className="text-sm">Catador</span>
                <h2 className="text-lg font-bold">{user.name}</h2>
                {user.person.map((associatedPerson: any) => (
                  <ul key={associatedPerson.id}>
                    {associatedPerson.collector.map((collector: any) => (
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
                          !distances[collector.id] === undefined
                            ? `Aproximadamente ${distances[collector.id]} km`
                            : "Não foi possível calcular a quantos Km ele se encontra."}
                        </p>
                      </li>
                    ))}
                  </ul>
                ))}
              </div>

              <div className="ml-4 flex h-full flex-col items-end justify-end gap-4">
                <Button variant="outline" className="rounded-full py-6">
                  <MessageCircleIcon />
                </Button>
                <Button variant="outline" className="rounded-full py-6">
                  <PhoneIcon />
                </Button>
                {selectedCollector && (
                  <CollectorInfoDialog
                    user={selectedCollector}
                    onOpen={openModal}
                    distances={distances}
                    onClose={() => setSelectedCollector(null)}
                  />
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
