import React, { useState, useEffect, useCallback } from 'react';
import './Dashboard.css';

import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer } from 'react-google-maps-api';

const googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY; // Store your API key in an environment variable

export default function Dashboard() {
    const [currentLocation, setCurrentLocation] = useState(null);
    const [directions, setDirections] = useState(null);
    const [isMapOpen, setIsMapOpen] = useState(false);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                setCurrentLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                });
            }, (error) => {
                console.error("Error getting current location", error);
            });
        }
    }, []);

    const toggleMap = useCallback(() => {
        setIsMapOpen(!isMapOpen);
    }, [isMapOpen]);

    const mapContainerStyle = {
        height: "400px",
        width: "800px"
    };

    const center = {
        lat: -34.397,
        lng: 150.644
    };

    // Map Section
    const MapSection = ({flightInfo}) => {
        return (
            <LoadScript googleMapsApiKey={googleMapsApiKey}>
                <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    center={center}
                    zoom={15}
                >
                    {currentLocation && (
                        <DirectionsService
                            options={{
                                destination: flightInfo.boardingGateLocation,
                                origin: currentLocation,
                                travelMode: "WALKING"
                            }}
                            callback={(res) => {
                                if (res !== null) {
                                    setDirections(res);
                                }
                            }}
                        />
                    )}
                    {directions && <DirectionsRenderer directions={directions} />}
                </GoogleMap>
            </LoadScript>
        );
    };

    return (
        <div className="dashboard-container">
            {/* ... existing elements ... */}

            {/* Map Section */}
            <button onClick={toggleMap}>Toggle Map</button>
            {isMapOpen && <MapSection flightInfo={flightInfo} />}

            {/* ... existing elements ... */}
        </div>
    );
}
        useEffect(() => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position) => {
                    setCurrentLocation({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    });
                    setIsMapOpen(true); // Open the map section
                }, (error) => {
                    console.error("Error getting current location", error);
                });
            }
        }, []);

    // ... existing toggleChat function

    const mapContainerStyle = {
        height: "400px",
        width: "800px"
    };

    const center = {
        lat: -34.397,
        lng: 150.644
    };

    // Map Section
    const MapSection = ({flightInfo, currentLocation, directions, setDirections}) => {
        const mapContainerStyle = {
            height: "400px",
            width: "800px"
        };

        const center = {
            lat: -34.397,
            lng: 150.644
        };

        return (
            <LoadScript googleMapsApiKey={googleMapsApiKey}>
                <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    center={center}
                    zoom={15}
                >
                    {currentLocation && (
                        <DirectionsService
                            options={{
                                destination: flightInfo.boardingGateLocation,
                                origin: currentLocation,
                                travelMode: "WALKING"
                            }}
                            callback={(res) => {
                                if (res !== null) {
                                    setDirections(res);
                                }
                            }}
                        />
                    )}
                    {directions && <DirectionsRenderer directions={directions} />}
                </GoogleMap>
            </LoadScript>
        );
    };

    // return (
    //     <div className="dashboard-container">
    //         {/* ... existing elements ... */}

    //         {/* Map Section */}
    //         {isMapOpen && <MapSection flightInfo={flightInfo} currentLocation={currentLocation} directions={directions} setDirections={setDirections} />}

    //         {/* ... existing elements ... */}
    //     </div>
    // );

