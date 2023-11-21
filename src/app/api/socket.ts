// import { Server as NetServer } from "http";
// import { NextApiRequest, NextApiResponse } from "next";
// import { Socket, Server as SocketIOServer } from "socket.io";

// export type NextApiResponseServerIo = NextApiResponse & {
//   socket: Socket & {
//     server: NetServer & {
//       io?: SocketIOServer;
//     };
//   };
// };

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// const ioHandler = (req: NextApiRequest, res: NextApiResponseServerIo) => {
//   if (!res.socket.server.io) {
//     const httpServer: NetServer = res.socket.server as NetServer;
//     const io = new SocketIOServer(httpServer, {
//       path: "/api/socket/io",
//       // Outros parâmetros, se necessário
//     });
//     res.socket.server.io = io;
//   }

//   res.end();
// };

// export default ioHandler;
