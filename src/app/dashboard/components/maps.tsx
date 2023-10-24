import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const Map = () => {
  const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

  const containerStyle = {
    width: "100vw",
    height: "400px",
  };

  const center = {
    lat: -34.397,
    lng: 150.644,
  };

  const teste = {
    lat: -16.0687,
    lng: -47.9766,
  };

  return (
    <LoadScript googleMapsApiKey={GOOGLE_API_KEY}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
