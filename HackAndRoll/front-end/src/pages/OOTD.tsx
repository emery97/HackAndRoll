import React from 'react';
import CameraFeed from '../components/AR/CameraFeed';
import PoseOverlay from '../components/AR/PoseOverlay';
import ClothingOverlay from '../components/AR/ClothingOverlay';

const OOTD: React.FC = () => {
  return (
    <>
        <div className="relative w-screen h-screen">
            <CameraFeed />
            <PoseOverlay />
            <ClothingOverlay />
        </div>
    </>
  );
};

export default OOTD;
