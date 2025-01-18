import React, { useEffect, useRef } from 'react';

const CameraFeed: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const setupCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error('Error accessing camera:', err);
      }
    };

    setupCamera();
  }, []);

  return <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />;
};

export default CameraFeed;
