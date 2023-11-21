import { NextApiRequest, NextApiResponse } from "next";
import { Server as NetServer, Socket } from "net";
import { Server as SocketIOServer } from "socket.io";

export type NextApiResponseServerIo = NextApiResponse & {
  socket: Socket & {
    server: NetServer & {
      io: SocketIOServer;
    };
  };
};
const ioHandler = (req: NextApiRequest, res: NextApiResponseServerIo) => {
  const socketServer = res.socket.server as NetServer & {
    io?: SocketIOServer;
  };
console.log(socketServer.io);
  if (!socketServer.io) {
    const httpServer: NetServer = socketServer as NetServer;
    const io = new SocketIOServer(httpServer, {
      path: "/api/socket",
      cors: {
        origin: "*",
      },
    });

    if (!socketServer) {
      res.socket.server = {};
    }

    socketServer.io = io;
  }

  res.end();
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default ioHandler;
