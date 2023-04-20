import { useEffect, useRef } from "react";
interface CameraProps {
  height?: number;
  width?: number;
}

const Camera: React.FC<CameraProps> = ({ height, width }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const enableCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
      } catch (error) {
        console.error("Error accessing camera:", error);
      }
    };

    enableCamera();
  }, []);

  return <video ref={videoRef} />;
};

export default Camera;
