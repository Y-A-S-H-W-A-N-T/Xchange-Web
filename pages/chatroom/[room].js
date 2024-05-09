import React, { useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:8000/')

export default function Home() {
    useEffect(() => {
        socket.emit('connected');
    }, []);

    return (
      <div>
        Socket.io Connection
      </div>
    )
}
