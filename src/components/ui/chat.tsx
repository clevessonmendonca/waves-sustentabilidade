import { useSocket } from '@/app/providers/socket';
import { useEffect, useState } from 'react';

export const Chat = () => {
  const { socket, isConnected } = useSocket();
  const [messages, setMessages] = useState<string[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');

  useEffect(() => {
    if (socket) {
      socket.on('receiveMessage', (message: string) => {
        setMessages(prevMessages => [...prevMessages, message]);
      });

      return () => {
        socket.off('receiveMessage');
      };
    }
  }, [socket]);

  const handleSendMessage = () => {
    if (socket && newMessage.trim() !== '') {
      socket.emit('sendMessage', newMessage);
      setNewMessage('');
    }
  };

  return (
    <div>
      <h2>Chat</h2>
      <div style={{ border: '1px solid #ccc', padding: '10px', height: '200px', overflowY: 'scroll' }}>
        {messages.map((message, index) => (
          <div key={index}>{message}</div>
        ))}
      </div>
      <div>
        <input
          type="text"
          value={newMessage}
          className='text-black'
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message"
        />
        <button onClick={handleSendMessage} disabled={!isConnected}>
          Send Message
        </button>
      </div>
    </div>
  );
};

export default Chat;
