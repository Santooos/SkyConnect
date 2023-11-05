// Dashboard.jsx
import React, { useState, useEffect } from 'react';
import './Chatwindow.css';
import socketIOClient from "socket.io-client";

const ENDPOINT = "http://localhost:3000"; // Use your server's address

export default function Dashboard() {
    const [flightTime, setFlightTime] = useState('10:30 AM');
    // ... other state variables ...

    const [chatMessages, setChatMessages] = useState([]);
    const [messageInput, setMessageInput] = useState('');

    useEffect(() => {
        // Initialize socket connection
        const socket = socketIOClient(ENDPOINT);
        
        // Listen for messages from the server
        socket.on('message', (message) => {
            setChatMessages((prevMessages) => [...prevMessages, message]);
        });

        return () => socket.disconnect();
    }, []);

    const handleSendMessage = () => {
        // Send message to the server
        const socket = socketIOClient(ENDPOINT);
        socket.emit('sendMessage', messageInput);
        setMessageInput(''); // Clear input after sending
    };

    // Render UI components...
    return (
        <div className="dashboard-container">
            {/* ... UI components ... */}
            <div className="chat-container">
                <div className="chat-messages">
                    {chatMessages.map((message, index) => (
                        <div key={index} className="chat-message">{message}</div>
                    ))}
                </div>
                <div className="chat-input-container">
                    <input
                        type="text"
                        value={messageInput}
                        onChange={(e) => setMessageInput(e.target.value)}
                        placeholder="Type your message..."
                    />
                    <button onClick={handleSendMessage}>Send</button>
                </div>
            </div>
            {/* ... More UI components ... */}
        </div>
    );
}
