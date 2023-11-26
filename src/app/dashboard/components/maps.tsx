"use client";

import React, { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

interface Location {
  lat: number;
  lng: number;
}

export const Map: React.FC = () => {
  const [userLocation, setUserLocation] = useState<Location | null>(null);
  const [coletadores, setColetadores] = useState<Location[]>([]);

  const mapCenter = userLocation || { lat: -16.0270884, lng: -48.0611234 };
  const mapZoom = 15;

  const icon = "";

  useEffect(() => {
    // Obter a localização do usuário
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error("Erro ao obter localização:", error.message);
        }
      );
    }
  }, []);

  // Simulando coletadores próximos (substitua isso pela lógica real)
  useEffect(() => {
    // Substitua esta parte pela lógica de obter coletadores próximos do backend
    const mockColetadores: Location[] = [
      { lat: -16.0270884, lng: -48.0611234 },
      // Adicione mais coletadores aqui...
    ];

    setColetadores(mockColetadores);
  }, []);

  return (
    <div>
      <LoadScript googleMapsApiKey="AIzaSyDeqtiaS3Hxv6l5lE0p82UFtc7pLPfIcQ8">
        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "400px" }}
          center={mapCenter}
          zoom={mapZoom}
        >
          {userLocation && <Marker position={userLocation} />}
          {coletadores.map((coletador, index) => (
            <Marker key={index} position={coletador} icon={icon} />
          ))}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

