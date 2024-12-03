import { useRef, useEffect, useState } from "react";
import jsQR from "jsqr";

export default function useQrRead() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [qrData, setQrData] = useState(null); // Stores detected QR code
  const [error, setError] = useState(null); // Stores any errors during scanning
  const [execute, setExecute] = useState(0); // Control re-execution

  useEffect(() => {
    let animationFrameId;

    const startVideo = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        const video = videoRef.current;
        if (video) {
          video.srcObject = stream;

          video.onloadedmetadata = () => {
            video.play();
          };
        }
      } catch (err) {
        console.error("Error accessing camera: ", err);
        setError("Unable to access camera");
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
          setQrData(code.data); // Set the QR code data
          return; // Stop scanning if a code is found
        }
      }

      // Continue scanning
      animationFrameId = requestAnimationFrame(scanQRCode);
    };

    const initialize = () => {
      setQrData(null); // Clear previous QR data
      setError(null); // Clear previous errors
      const canvas = canvasRef.current;
      contextRef.current = canvas.getContext("2d");
      startVideo();
      scanQRCode();
    };

    initialize();

    // Cleanup function
    return () => {
      const stream = videoRef.current?.srcObject;
      if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, [execute]); // Reinitialize when 'execute' changes

  // Reset function to manually restart scanning
  const resetScanning = () => {
    setExecute((prev) => prev + 1); // Increment to re-trigger the useEffect
  };

  return { videoRef, canvasRef, qrData, error, setError, resetScanning };
}
