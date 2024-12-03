import React, { useEffect } from "react";
import { API_URL } from "@/util/config";
import { useRouter } from "next/navigation";
import useQrRead from "@/hooks/useQrRead"; // Ensure this hook is correctly implemented

const QRScannerUserEvent = ({ idUser, idEvent, setLoading, setError }) => {
  const { videoRef, canvasRef, qrData, resetScanning } = useQrRead();
  const router = useRouter();

  // Function to handle registration in the event stand
  const handlerRegisterStandEvent = async (createEvent) => {
    try {
      // Perform API request
      const response = await fetch(`${API_URL}/eventuser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(createEvent),
      });

      if (!response.ok) {
        throw new Error("Failed to register for the event stand");
      }

      // Handle successful response
      const responseData = await response.json();
      console.log("Registration successful:", responseData);

      // Navigate to the stand page
      router.push(`/stand/${createEvent.eventId}`);
    } catch (error) {
      console.error("Error during registration:", error);
      setError("Registration failed. Please try again.");
      resetScanning()
      setTimeout(() => {
        setError(null)
        //vuelve a ejecutar 
      }, 2000); // Reset error after 3 seconds
    } finally {
      setLoading(false); // Ensure loading state is stopped
    }
  };

  // Effect to handle QR code processing
  useEffect(() => {
    if (qrData) {
      setLoading(true);

      if (idEvent == +qrData) {
        // Register the user if the QR code matches the event
        handlerRegisterStandEvent({ eventId: idEvent, userId: idUser });
      } else {
        // Set an error if the QR code doesn't match and reset for continued scanning
        setError("The scanned QR code does not belong to this event stand.");
        resetScanning()
        setTimeout(() => {
          setError(null)
          //vuelve a ejecutar 
          setLoading(false)
        }, 2000); // Reset error after 3 seconds

      }
    }
  }, [qrData]); // Add dependencies to avoid stale state


  return (
    <div className="qr-scanner">
      {/* Hidden video feed for camera input */}
      <video ref={videoRef} style={{ display: "none" }} />

      {/* Canvas to display the QR scan output */}
      <canvas ref={canvasRef} style={{ width: "100%", height: "100%" }} />
    </div>
  );
};

export default QRScannerUserEvent;
