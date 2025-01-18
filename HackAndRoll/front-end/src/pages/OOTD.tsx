import React from 'react';
import CameraFeed from '../components/AR/CameraFeed';
import PoseOverlay from '../components/AR/PoseOverlay';
import ClothingOverlay from '../components/AR/ClothingOverlay';
import { PoseProvider } from '../components/AR/PoseContext';

const OOTD: React.FC = () => {
  return (
    <PoseProvider>
      <div className="relative w-[1920] h-[1000] style={{ zIndex: 1 }}">
        <CameraFeed />
        <PoseOverlay />
        <ClothingOverlay />
      </div>
    </PoseProvider>
  );
};

export default OOTD;
