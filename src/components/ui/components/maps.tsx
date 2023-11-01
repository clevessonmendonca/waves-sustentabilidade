"use client";

import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

export const Map = () => {
  const mapCenter = { lat: -16.0270884, lng: -48.0611234 }; // Coordenadas de Brasília, Gama - DF
  const mapZoom = 15;

  const markers = [{ position: { lat: -16.0270884, lng: -48.0611234 } }];
  const icon = "";

  return (
    <div>
      <LoadScript googleMapsApiKey="AIzaSyDeqtiaS3Hxv6l5lE0p82UFtc7pLPfIcQ8">
        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "400px" }}
          center={mapCenter}
          zoom={mapZoom}
        >
          {markers.map((marker, index) => (
            <Marker key={index} position={marker.position} icon={icon} />
          ))}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};
