import React, { useEffect, useState } from 'react';
import Pusher from 'pusher-js';
import './Chat.css';
import { useAuth0 } from '@auth0/auth0-react';

const Chat = () => {
  const { user } = useAuth0(); // Obtienes el usuario de Auth0
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  // Si el usuario no está logueado, no se puede enviar el mensaje
  const username = user ? user.name : 'Invitado'; // Si hay usuario, muestra su nombre; si no, muestra 'Invitado'

  useEffect(() => {
    const pusher = new Pusher('2eb329b9cdae48c4a636', {
      cluster: 'us2',
      useTLS: true,
    });

    const channel = pusher.subscribe('chat');
    channel.bind('message', function (data) {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      channel.unbind_all();
      pusher.unsubscribe('chat');
    };
  }, []);

  const submit = async (e) => {
    e.preventDefault();

    await fetch('http://localhost:8000/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username,
        message,
      }),
    });

    setMessage('');
  };

  return (
    <div className="container">
      <div className="header">
        <h3>{username}</h3> {/* Muestra el nombre del usuario */}
      </div>
      <div className="scrollarea">
        {messages.map((msg, index) => (
          <div key={index} className="message">
            <strong>{msg.username}</strong>
            <span>{msg.message}</span>
          </div>
        ))}
      </div>
      <form onSubmit={submit}>
        <div className="input-group">
          <input
            type="text"
            placeholder="escribe tu mensaje"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type="submit">Send</button>
        </div>
      </form>
    </div>
  );
};

export default Chat;
