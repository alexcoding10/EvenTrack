import React, { useRef, useEffect, useState } from "react";
import jsQR from "jsqr";
import { CircularProgress } from "@mui/material";
import { API_URL } from "@/util/config";
import { useRouter } from "next/navigation";

const QRScanner = ({ idUser, idEvent, loading, setLoading, setError }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const router = useRouter();

  // Manejo de registro en el stand del evento
  const handlerRegisterStandEvent = async (createEvent) => {
    try {
      // Realiza la petición a la API
      const response = await fetch(`${API_URL}/eventuser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(createEvent),
      });

      if (!response.ok) {
        throw new Error("No se ha podido hacer la petición");
      }

      // Redirige al stand del evento si la respuesta es exitosa
      const responseData = await response.json();
      console.log(responseData);
      router.push(`/stand/${createEvent.eventId}`);
    } catch (error) {
      console.error("Error al registrar el stand:", error);
    }
  };

  useEffect(() => {
    const startVideo = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        const video = videoRef.current;
        video.srcObject = stream;

        video.onloadedmetadata = () => {
          video.play();
        };
      } catch (err) {
        console.error("Error accessing camera: ", err);
      }
    };

    const scanQRCode = () => {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = contextRef.current;

      if (!context || !canvas || !video) return;

      if (video.readyState === video.HAVE_ENOUGH_DATA) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, canvas.width, canvas.height);

        if (code) {
          setLoading(true);
          console.log(idEvent,code.data)
          if (idEvent === +code.data) {
            // Si el código QR coincide, realiza la petición
            handlerRegisterStandEvent({ eventId: idEvent, userId: idUser });
          } else {
            // Si no coincide, muestra un error
            console.log('hay un fallo')
            setLoading(false)
            setError(true);
          }

        }
      }

      requestAnimationFrame(scanQRCode);
    };

    const initialize = () => {
      const canvas = canvasRef.current;
      contextRef.current = canvas.getContext("2d");
      startVideo();
      scanQRCode();
    };

    // Inicia el escaneo
    initialize();

    // Cleanup: Detiene el escaneo y la cámara cuando el componente se desmonta
    return () => {
      const stream = videoRef.current?.srcObject;
      if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop()); // Detiene los tracks del stream
      }
    };
  }, []); // Añadido modalOpen como dependencia para detener el escaneo cuando el modal se cierra

  // Si está cargando, muestra un indicador de carga
  if (loading) {
    return (
      <CircularProgress size={80} sx={{ color: "purple" }} />
    );
  }

  return (
    <div>
      <video ref={videoRef} style={{ display: "none" }}></video>
      <canvas ref={canvasRef} style={{ width: "100%", height: "100%" }}></canvas>
    </div>
  );
};

export default QRScanner;
