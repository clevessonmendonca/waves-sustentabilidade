import React from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogClose,
} from "@/components/ui/dialog";
import {
  InfoIcon,
  MapPinIcon,
  MessageCircleIcon,
  PhoneIcon,
} from "lucide-react";
import { User } from "@/@types/User";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";

interface CollectorInfoDialogProps {
  user: User;
  distances: Record<string, number>;
  onClose: () => void;
  onOpen: boolean;
}

export function CollectorInfoDialog({
  user,
  onClose,
  onOpen,
  distances,
}: CollectorInfoDialogProps) {
  if (!user) return null;

  return (
    <Dialog open={onOpen} onOpenChange={() => onClose()}>
      <DialogTrigger asChild>
        <Button variant="outline" className="rounded-full py-6">
          <InfoIcon />
        </Button>
      </DialogTrigger>

      <DialogContent className="py-12 sm:max-w-md">
        <>
          {user.person.map((person) => (
            <div key={person.id} className="flex flex-col items-center gap-2">
              <Image
                src={user.image}
                width={0}
                height={0}
                sizes="100vw"
                className="h-full w-full max-w-[80px] rounded-full bg-contain"
                alt={""}
              />
              <h1 className="text-3xl font-bold">{person.name}</h1>

              {person.collector.map((collector) => (
                <div
                  key={collector.id}
                  className="flex w-full flex-col justify-start gap-2"
                >
                  <h2 className="text-center text-2xl font-semibold">
                    {collector.organization}
                  </h2>

                  <div>
                    <span className="font-semibold">Biografia</span>
                    <p className="text-sm opacity-80">{collector.biography}</p>
                  </div>
                  <Separator />

                  <div>
                    <span className="font-semibold">Descrição de serviços</span>
                    <p className="text-sm">
                      {collector.collectionServiceDescription ||
                        "Faço coletas!"}
                    </p>
                  </div>

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

                  <div className="mt-5 flex items-center justify-center gap-4">
                    <Button
                      variant="outline"
                      className="flex w-full gap-4 rounded-full"
                    >
                      <MessageCircleIcon />
                      Mandar mensagem
                    </Button>
                    <Button
                      variant="outline"
                      className="flex w-full gap-4 rounded-full"
                    >
                      <PhoneIcon />
                      Entrar em contato
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </>
      </DialogContent>
    </Dialog>
  );
}
