/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  StandaloneSearchBox,
} from "@react-google-maps/api";

const AddressFrom = ({ setAddress, setCity, setState }) => {
  

  const inputRef = useRef(null);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyDDrhX4vwjxfraCF0eW31jKVRAt8Hwd8IE",
    libraries: ["places"],
  });

  const handleOnPlacesChanged = () => {
    let places = inputRef.current.getPlaces();
    if (places.length > 0) {
      const place = places[0];
      const addressComponents = place.address_components;
  
      // Extract city and state
      const cityComponent = addressComponents.find((comp) =>
        comp.types.includes("locality")
      )?.long_name; // City
      const stateComponent = addressComponents.find((comp) =>
        comp.types.includes("administrative_area_level_1")
      )?.long_name; // State
  
      // Set city and state
      setCity(cityComponent || "Not Found");
      setState(stateComponent || "Not Found");
  
      // Address extraction logic
      const formattedAddress = [
        place.name,
        addressComponents.find((comp) => comp.types.includes("route"))?.long_name,
        addressComponents.find((comp) =>
          comp.types.includes("sublocality_level_1")
        )?.long_name,
        stateComponent, // State (already extracted)
        addressComponents.find((comp) => comp.types.includes("country"))
          ?.long_name, // Country
      ]
        .filter(Boolean)
        .join(", ");
  
      setAddress(formattedAddress);
  
      
    }
  };
  

  return (
    <div className="w-full">
      {isLoaded && (
        <StandaloneSearchBox
          onLoad={(ref) => (inputRef.current = ref)}
          onPlacesChanged={handleOnPlacesChanged}
        >
          <input
            className="input input-bordered mt-10 w-full max-w-[640px]"
            type="text"
            placeholder="Address"
          />
        </StandaloneSearchBox>
      )}
    </div>
  );
};

export default AddressFrom;