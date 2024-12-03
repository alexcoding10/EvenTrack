import React, { useEffect, useState } from "react";
import { API_URL } from "@/util/config";
import { useRouter } from "next/navigation";
import useQrRead from "@/hooks/useQrRead"; // Ensure this hook is correctly implemented

  const QRScannerUserStand = ({ idUser, idStand, setLoading, setError, handlerStandHasVisited,setOpen,handleSetStandActive}) => {
  const { videoRef, canvasRef, qrData, resetScanning } = useQrRead();
  const [newStand,setNewStand] = useState()

  useEffect(()=>{
  },[newStand])
  
  // Function to handle registration in the event stand
  const handlerRegisterStandEvent = async (createEvent) => {
    try {
      // Perform API request
      const response = await fetch(`${API_URL}/standuser`, {
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
      handlerStandHasVisited(responseData)
      handleSetStandActive(responseData)
      //cerrar modal

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
    console.log(idStand, idUser )

    if (qrData) {
      setLoading(true);

      if (idStand == +qrData) {
        // Register the user if the QR code matches the event
        handlerRegisterStandEvent({ standId: +qrData, userId: idUser });
        window.location.reload() //! evitar bug
        //cierro la modal 
        setOpen(false)
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

export default QRScannerUserStand;
