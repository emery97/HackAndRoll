import React, { useRef, useEffect, useState } from 'react';
import * as poseDetection from '@tensorflow-models/pose-detection';
import '@tensorflow/tfjs-backend-webgl'; // Include this if you're using WebGL backend
import * as tf from '@tensorflow/tfjs';

const PoseOverlay: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [detector, setDetector] = useState<poseDetection.PoseDetector | null>(null);

  // Setup pose detector
  useEffect(() => {
    const setupPoseDetector = async () => {
      // Ensure TensorFlow.js is initialized
      await tf.ready(); // Wait for TensorFlow.js to be ready

      // Optionally, set a specific backend if webgpu causes issues
      await tf.setBackend('webgl'); // Force using the webgl backend

      const model = poseDetection.SupportedModels.MoveNet;
      const detectorConfig = { modelType: poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING };
      const newDetector = await poseDetection.createDetector(model, detectorConfig);
      setDetector(newDetector);
    };

    setupPoseDetector();
  }, []);

  // Detect poses
  useEffect(() => {
    const detectPose = async () => {
      if (!detector || !videoRef.current || !canvasRef.current) return;

      const ctx = canvasRef.current.getContext('2d');
      if (!ctx) return;

      // Wait until the video is ready and has valid dimensions
      videoRef.current.onloadedmetadata = () => {
        if (videoRef.current && canvasRef.current) {
          // Set canvas size to match video size
          canvasRef.current.width = videoRef.current.videoWidth;
          canvasRef.current.height = videoRef.current.videoHeight;
        }
      };

      const detect = async () => {
        const poses = await detector.estimatePoses(videoRef.current!);
        if (canvasRef.current) {
          ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        }

        poses.forEach((pose) => {
          pose.keypoints.forEach((keypoint) => {
            if (keypoint.score !== undefined && keypoint.score > 0.5) {
              ctx.beginPath();
              ctx.arc(keypoint.x, keypoint.y, 5, 0, 2 * Math.PI);
              ctx.fillStyle = 'red';
              ctx.fill();
            }
          });
        });

        requestAnimationFrame(detect);
      };

      detect();
    };

    detectPose();
  }, [detector]);

  // Access webcam
  useEffect(() => {
    const startVideo = async () => {
      if (videoRef.current) {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoRef.current.srcObject = stream;
      }
    };
    startVideo();
  }, []);

  return (
    <div className="relative">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        className="absolute inset-0 w-full h-full"
        onLoadedMetadata={() => {
          if (videoRef.current) {
            videoRef.current.play();
          }
        }}
      />
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
};

export default PoseOverlay;
