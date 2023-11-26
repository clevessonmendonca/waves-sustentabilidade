"use client";

import React, { useContext, useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import Loading from "@/app/loading";
import { UserContext } from "@/app/providers/user";

interface Location {
  lat: number;
  lng: number;
}

// Import statements...

export const Map: React.FC = () => {
  const userData = useContext(UserContext);
  const [userLocation, setUserLocation] = useState<Location | null>(null);
  const [coletadores, setColetadores] = useState<Location[]>([]);
  const mapCenter = userLocation || { lat: -16.0270884, lng: -48.0611234 };
  const mapZoom = 15;
  const API_KEY =
    process.env.GOOGLE_API_KEY || "AIzaSyDeqtiaS3Hxv6l5lE0p82UFtc7pLPfIcQ8";
  const icon = "";

  useEffect(() => {
    if (!userData) {
      return;
    }

    const person = userData.userData;

    const getLatLongFromCep = async (cep: string): Promise<Location | null> => {
      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${cep}&key=${API_KEY}`,
        );

        if (!response.ok) {
          throw new Error(`Erro na requisição: ${response.statusText}`);
        }

        const data = await response.json();
        console.log(data);
        if (data.results && data.results.length > 0) {
          const location = data.results[0].geometry.location;
          return { lat: location.lat, lng: location.lng };
        } else {
          return null;
        }
      } catch (error) {
        console.error("Erro ao obter lat/long a partir do CEP:", error);
        return null;
      }
    };

    if (person && person.cep) {
      getLatLongFromCep(person.cep);
    }
  }, [userData]);

  useEffect(() => {
    const mockColetadores: Location[] = [
      { lat: -16.0270884, lng: -48.0611234 },
    ];

    setColetadores(mockColetadores);
  }, []);

  if (!userData) {
    return <Loading />;
  }

  return (
    <div>
      <LoadScript googleMapsApiKey={API_KEY}>
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
