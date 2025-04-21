"use client";

import { useCallback } from "react";
import { motion } from "framer-motion";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
const containerStyle = {
  width: "800px",
  height: "600px",
  margin: "0 auto",
};

const center = {
  lat: -3.745,
  lng: -38.523,
};

const WelcomePage = () => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLEMAPS_API_KEY || "",
  });
  const onLoad = useCallback(function callback(map: any) {
    console.log("map loaded", map);
  }, []);

  return (
    <motion.div className="h-screen w-full ">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-screen">
        <div className="md:col-span-1">
          <div className="flex flex-col items-center justify-center h-full">
            <h1 className="text-4xl font-bold mb-4">Welcome to Our Service</h1>
            <p className="text-lg text-gray-600">
              Discover amazing places and experiences with us.
            </p>
          </div>
        </div>
        <div className="md:col-span-1 w-full h-screen flex items-center justify-center">
          {isLoaded ? (
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={10}
              onLoad={onLoad}
            >
              <></>
            </GoogleMap>
          ) : (
            <></>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default WelcomePage;
