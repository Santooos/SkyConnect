import React, { useState, useEffect } from 'react';
import './Chatwindow.css';
import socketIOClient from "socket.io-client";
import { FaTimes } from 'react-icons/fa';

// Assuming your server is running on localhost:3000
const ENDPOINT = "http://localhost:3000";

export default function Dashboard() {
    const [flightInfo, setFlightInfo] = useState({
        flightTime: 'Loading...',
        boardingGate: 'Loading...',
        baggageClaimGate: 'Loading...',
    });
    const [chatMessages, setChatMessages] = useState([]);
    const [messageInput, setMessageInput] = useState('');
    const [isChatOpen, setIsChatOpen] = useState(false);

    // Initialize the socket connection outside of useEffect to use it in handleSendMessage
    const socket = socketIOClient(ENDPOINT);

    useEffect(() => {
        // Listen for messages from the server
        socket.on('message', (message) => {
            setChatMessages((prevMessages) => [...prevMessages, message]);
        });

        // Cleanup function to disconnect socket when component unmounts
        return () => socket.disconnect();
    }, []);

    // Function to handle sending messages
    const handleSendMessage = () => {
        if (messageInput.trim()) {
            // Dummy senderId and receiverId for example purposes
            const messageData = {
                senderId: 1, // The ID of the sender, should be dynamic based on logged-in user
                receiverId: 2, // The ID of the receiver, should be dynamic based on the selected user to chat with
                content: messageInput, // The message content from the input
            };

            socket.emit('sendMessage', messageData);
            setMessageInput(''); // Clear input after sending
        }
    };

    // Render UI components
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
                <button className="close-chat-btn" onClick={() => setIsChatOpen(false)}>
                    <FaTimes />
                </button>
                {/* Chat content */}
                <div className="chat-messages">
                    {chatMessages.map((message, index) => (
                        <div key={index} className="chat-message">{message.content}</div>
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
                <button className="open-chat-btn" onClick={() => setIsChatOpen(true)}>
                    Open Chat
                </button>
            )}
        </div>
    );
}
