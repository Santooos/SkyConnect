import React, { useState, useEffect } from 'react';
import './Chatwindow.css';
import io from 'socket.io-client';
import axios from 'axios';
import { FaTimes } from 'react-icons/fa';

const ENDPOINT = "http://localhost:3000"; // Use your server's address
const API_BASE_URL = "http://yourapi.com"; // Replace with the actual base URL of your API

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
        // Initialize socket connection only once when the component mounts
        const socket = io(ENDPOINT);
        
        // Listen for flight information updates from the server
        socket.on('flightInfoUpdate', (updateFlightInfo) => {
            setFlightInfo(prevInfo => ({
                ...prevInfo,
                ...updateFlightInfo
            }));
        });

        // Listen for messages from the server
        socket.on('message', (message) => {
            setChatMessages(prevMessages => [...prevMessages, message]);
        });

        // Fetch initial flight information
        fetchFlightInfo();

        // Cleanup function to disconnect socket when component unmounts
        return () => {
            socket.off('flightInfoUpdate');
            socket.off('message');
            socket.disconnect();
        };
    }, []);

    // Fetch flight information from the API
    const fetchFlightInfo = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/flights?date=2021-08-29&origin=DFW`);
            if (response.status === 200 && response.data.length > 0) {
                const flightDetails = response.data[0];
                setFlightInfo({
                    flightTime: flightDetails.departureTime,
                    boardingGate: flightDetails.origin.code,
                    baggageClaimGate: flightDetails.destination.code,
                });
            }
        } catch (error) {
            console.error("Error fetching flight info:", error);
        }
    };

    const handleSendMessage = () => {
        if (messageInput.trim()) {
            // Emit message to the server using the socket instance from useEffect
            io(ENDPOINT).emit('sendMessage', messageInput);
            setMessageInput(''); // Clear input after sending
        }
    };

    const toggleChat = () => setIsChatOpen(!isChatOpen);

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
            {isChatOpen ? (
                <div className={`chat-window ${isChatOpen ? 'open' : ''}`}>
                    {/* Close Chat Button */}
                    <button className="close-chat-btn" onClick={toggleChat}>
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
            ) : (
                // Open Chat Button (Only shows when chat is not open)
                <button className="open-chat-btn right-corner" onClick={toggleChat}>
                    Open Chat
                </button>
            )}
        </div>
    );
}
