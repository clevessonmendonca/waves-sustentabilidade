// ChatMessage.tsx
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { Input } from "./input";
import { Card, CardContent, CardHeader } from "./card";
import { Button } from "./button";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { PersonWithValues } from "@/app/dashboard/schedule/[scheduleId]/page";
import { PhoneIcon } from "lucide-react";
import { Separator } from "./separator";

export const ChatMessage = ({ person }: { person: PersonWithValues }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [message, setMessage] = useState("");
  const [receivedMessage, setReceivedMessage] = useState("");

  //   useEffect(() => {
  //     const newSocket = io("/api/socket");
  //     setSocket(newSocket);

  //     return () => {
  //       newSocket.disconnect();
  //     };
  //   }, []);

  //   const sendMessage = () => {
  //     if (socket && message) {
  //       socket.emit("send_msg", { message, roomId: "your_room_id" });
  //     }
  //   };

  //   useEffect(() => {
  //     if (socket) {
  //       socket.on("receive_msg", ({ message }: { message: string }) => {
  //         setReceivedMessage(message);
  //       });
  //     }
  //   }, [socket]);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between gap-2 pb-4">
        <div className="flex items-center gap-2">
          <Avatar className="h-10 w-10">
            {person.avatar && <AvatarImage src={person.avatar} />}
          </Avatar>

          <h3 className="font-semibold ">{person.name}</h3>
        </div>

        <PhoneIcon />
      </CardHeader>
      <Separator className="mb-4" />
      <CardContent className="flex max-w-sm flex-col gap-2">
        <div className="flex h-72 flex-col gap-4">
          <div className="flex gap-2 text-sm">
            <Avatar className="h-8 w-8">
              {person.avatar && <AvatarImage src={person.avatar} />}
            </Avatar>
            <p className="inline rounded-2xl bg-accent px-5 py-2">
              Olá, me chamo {person.name}, você quer saber mais sobre minha
              coleta?
            </p>
          </div>

          <div className="flex justify-end gap-2 text-sm">
            <Avatar className="order-2 h-8 w-8">
              {person.avatar && <AvatarImage src={person.avatar} />}
            </Avatar>
            <p className="inline rounded-2xl bg-primary/50 px-5 py-2">
              Olá, tudo bem! Me conte mais...
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Envie sua mensagem"
          />
          <Button disabled>Enviar</Button>
        </div>
      </CardContent>
    </Card>
  );
};
