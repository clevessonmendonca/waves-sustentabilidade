"use client"

import { createContext, useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

export type SocketContextType = {
  socket: Socket | null;
  isConnected: boolean;
};

export const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
});

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const socketInstance = io(process.env.NEXT_PUBLIC_BASE_URL!, {
      path: "/api/socket/io",
      addTrailingSlash: false,
    });
  console.log(socketInstance)
    socketInstance.on('connect', () => {
      console.log('Connected to Socket.IO');
      setIsConnected(true);
    });
  
    socketInstance.on('disconnect', () => {
      console.log('Disconnected from Socket.IO');
      setIsConnected(false);
    });
  
    socketInstance.on('error', (error) => {
      console.error('Socket.IO Error:', error);
    });
  
    setSocket(socketInstance);
  
    return () => {
      socketInstance.disconnect();
      console.log('Disconnected from Socket.IO (cleanup)');
    };
  }, []);
  

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
};
