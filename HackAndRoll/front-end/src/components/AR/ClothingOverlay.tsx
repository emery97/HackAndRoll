import React, { useEffect, useRef, useState } from 'react';
import * as poseDetection from '@tensorflow-models/pose-detection';
import '@tensorflow/tfjs-backend-webgl';

const ClothingOverlay: React.FC = () => {
  const [userPose, setUserPose] = useState<any>(null);
  const [clothingImage, setClothingImage] = useState<string | null>(null); // Base64 string for clothing image
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const detector = useRef<any>(null);

  // Fetch clothing image from backend (MongoDB via API)
  useEffect(() => {
    const fetchClothingImage = async () => {
      try {
        const response = await fetch('http://localhost:3000/image-clothing/fetch');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();  // This will throw if the response is not valid JSON
        console.log(data);  // Handle the fetched data (e.g., display the image)
      } catch (error) {
        console.error('Error fetching clothing image:', error);
      }
    };

    fetchClothingImage();  // Call the function inside useEffect
  }, []); 

  // Set up pose detection
  useEffect(() => {
    const setupPoseDetector = async () => {
      const model = poseDetection.SupportedModels.MoveNet;
      const detectorConfig = { modelType: poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING };
      const newDetector = await poseDetection.createDetector(model, detectorConfig);
      detector.current = newDetector;
    };

    setupPoseDetector();
  }, []);

  // Function to detect poses
  const detectPose = async () => {
    if (detector.current && videoRef.current) {
      const poses = await detector.current.estimatePoses(videoRef.current);
      setUserPose(poses[0]); // Assuming one person in the frame
    }
  };

  useEffect(() => {
    const interval = setInterval(detectPose, 100); // Detect pose every 100ms
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (userPose && canvasRef.current && clothingImage) {
      const ctx = canvasRef.current.getContext('2d');
      if (!ctx) return;

      // Clear the canvas before drawing
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

      const { keypoints } = userPose;
      const torso = keypoints.find((kp: any) => kp.part === 'leftShoulder' || kp.part === 'rightShoulder');

      if (torso && torso.score > 0.5 && clothingImage) {
        const img = new Image();
        img.src = `data:image/png;base64,${clothingImage}`; // Set the image source to the base64 string
        img.onload = () => {
          const imgWidth = 100; // Adjust clothing width
          const imgHeight = 150; // Adjust clothing height

          // Calculate the position to center it on the torso
          const x = torso.position.x - imgWidth / 2;
          const y = torso.position.y - imgHeight / 2;

          // Draw the clothing image aligned with the body
          ctx.drawImage(img, x, y, imgWidth, imgHeight);
        };
      }
    }
  }, [userPose, clothingImage]);

  return (
    <div>
      <video ref={videoRef} width="640" height="480" autoPlay muted />
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
};

export default ClothingOverlay;
