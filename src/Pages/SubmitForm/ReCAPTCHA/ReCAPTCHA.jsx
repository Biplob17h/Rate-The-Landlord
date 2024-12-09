/* eslint-disable react/prop-types */
import { Turnstile } from "@marsidev/react-turnstile";
import { useState } from "react";

const ReCAPTCHA = ({ token, setToken }) => {
  const [isTurnstileCompleted, setIsTurnstileCompleted] = useState(false); // Track completion state

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!isTurnstileCompleted || !token) {
      alert("Please complete the human verification.");
      return;
    }
  
    
  
    try {
      const response = await fetch(
        `http://localhost:5000/api/v1/verify-turnstile`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        }
      );
  
      const result = await response.json();
  
      if (response.ok) {
        alert("Human verification successful! Form submitted.");
        
      } else {
        alert("Verification failed. Please try again.");
        console.error("Verification Error:", result);
      }
    } catch (error) {
      console.error("Error verifying Turnstile token:", error);
      alert("An error occurred during verification. Please try again.");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* Turnstile Widget */}
        <Turnstile
          siteKey="0x4AAAAAAA08v-QtoN55GS9h" // Replace with your actual Turnstile Site Key
          onVerify={(newToken) => {
            setToken(newToken); // Update the token state
            setIsTurnstileCompleted(true); // Mark Turnstile as completed
          }}
          onExpire={() => {
            setToken(null); // Reset the token state
            setIsTurnstileCompleted(false); // Mark Turnstile as incomplete
          }}
          options={{ theme: "light" }} // Optional: Customize the widget (light/dark themes)
        />
      </form>
    </div>
  );
};

export default ReCAPTCHA;
