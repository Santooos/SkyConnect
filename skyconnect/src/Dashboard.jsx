// import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import Chatwindow from './Chatwindow';



export default function Dashboard() {
    // const [flightTime, setFlightTime] = useState('10:30 AM');
    // const [boardingGate, setBoardingGate] = useState('Gate 5');
    // const [baggageClaimGate, setBaggageClaimGate] = useState('Gate 2');
  
    // const [showNotifications, setShowNotifications] = useState(false);

    // useEffect(() => {
    //     // Listen for window resize events
    //     const handleResize = () => {
    //         // Set state based on window width, if needed
    //     };

    //     window.addEventListener('resize', handleResize);
    //     handleResize(); // Call it immediately to set initial state

    //     // Remove event listener on cleanup
    //     return () => window.removeEventListener('resize', handleResize);
    // }, []);

    return (
        <Chatwindow/>
    );

    // Handlers for sending messages and notifications
    // ...

    
}