import React, { useState, useEffect } from 'react';
import './Chatwindow.css';
import io from 'socket.io-client';
import { FaTimes } from 'react-icons/fa';

// Replace with your server's endpoint
const ENDPOINT = process.env.REACT_APP_SERVER_ENDPOINT || "http://localhost:3000";
const socket = io(ENDPOINT);

export default function Dashboard() {
    const [flightInfo, setFlightInfo] = useState({
        flightTime: 'Loading...',
        boardingGate: 'Loading...',
        baggageClaimGate: 'Loading...',
    });
    const [chatMessages, setChatMessages] = useState([]);
    const [messageInput, setMessageInput] = useState('');
    const [isChatOpen, setIsChatOpen] = useState(false);

    useEffect(() => {
        // Listen for messages from the server
        socket.on('message', (newMessage) => {
            setChatMessages(prevMessages => [...prevMessages, newMessage]);
        });

        // Clean up on component unmount
        return () => {
            socket.off('message');
        };
    }, []);

    const handleToggleChat = () => setIsChatOpen(prev => !prev);

    const handleSendMessage = () => {
        if (messageInput.trim()) {
            // Emit message to the server
            socket.emit('sendMessage', messageInput);

            // Optionally add the message to the chat immediately for a responsive UI
            setChatMessages(prevMessages => [...prevMessages, messageInput]);

            setMessageInput(''); // Clear input after sending
        }
    };

    return (
        <div className="dashboard-container">
            {/* Flight Info Section */}
            <div className="flight-info-section">
                <h1>Flight Information</h1>
                <p>Flight Time: {flightInfo.flightTime}</p>
                <p>Boarding Gate: {flightInfo.boardingGate}</p>
                <p>Baggage Claim Gate: {flightInfo.baggageClaimGate}</p>
            </div>

            {/* Chat Section */}
            <div className={`chat-window ${isChatOpen ? 'open' : ''}`}>
                {/* Close Chat Button */}
                <button className="close-chat-btn" onClick={handleToggleChat}>
                    <FaTimes />
                </button>
                {/* Chat content */}
                <div className="chat-messages">
                    {chatMessages.map((message, index) => (
                        <div key={index} className="chat-message">{message}</div>
                    ))}
                </div>
                <div className="chat-input-container">
                    <input
                        type="text"
                        className="chat-input"
                        value={messageInput}
                        onChange={(e) => setMessageInput(e.target.value)}
                        placeholder="Type your message..."
                    />
                    <button className="chat-send-button" onClick={handleSendMessage}>Send</button>
                </div>
            </div>
            {/* Open Chat Button (Only shows when chat is not open) */}
            {!isChatOpen && (
                <button className="open-chat-btn" onClick={handleToggleChat}>
                    Open Chat
                </button>
            )}
        </div>
    );
}
