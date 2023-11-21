import { NextApiRequest, NextApiResponse } from "next";
import { Server as NetServer } from "http";  // Importar apenas NetServer
import { Server as SocketIOServer } from "socket.io";

export type NextApiResponseServerIo = NextApiResponse & {
  socket: SocketIOServer;  // Atualizar o tipo para SocketIOServer diretamente
};

const ioHandler = (req: NextApiRequest, res: NextApiResponseServerIo) => {
  const socketServer = res.socket.server as {
    io?: SocketIOServer;
  };

  if (!socketServer.io) {
    const httpServer: NetServer = res.socket.server as NetServer;  // Usar res.socket.server diretamente
    const io = new SocketIOServer(httpServer, {
      path: "/api/socket",
      cors: {
        origin: "*",
      },
    });

    res.socket.server.io = io;
  }

  res.end();
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default ioHandler;
