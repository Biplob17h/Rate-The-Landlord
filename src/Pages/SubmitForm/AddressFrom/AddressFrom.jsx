/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useRef, useState } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  StandaloneSearchBox,
} from "@react-google-maps/api";

const AddressFrom = ({setAddress}) => {
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

      // Extract the components we need
      const addressComponents = place.address_components;
      const formattedAddress = [
        place.name, // Business name
        addressComponents.find((comp) => comp.types.includes("route"))
          ?.long_name, // Street name
        addressComponents.find((comp) =>
          comp.types.includes("sublocality_level_1")
        )?.long_name, // Sublocality
        addressComponents.find((comp) =>
          comp.types.includes("administrative_area_level_1")
        )?.short_name, // State (e.g., ON)
        addressComponents.find((comp) => comp.types.includes("country"))
          ?.long_name, // Country
      ]
        .filter(Boolean) // Remove undefined/null values
        .join(", "); // Join with commas

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
