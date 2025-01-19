import React, { useEffect, useState } from 'react';
import CameraFeed from '../components/AR/CameraFeed';
import PoseOverlay from '../components/AR/PoseOverlay';
import ClothingOverlay from '../components/AR/ClothingOverlay';
import { PoseProvider } from '../components/AR/PoseContext';
import { useParams } from 'react-router-dom';

const OOTD: React.FC = () => {

  const [clothingImage, setClothingImage] = useState<string | null>(null); // Base64 string for clothing image
  const { id } = useParams<{ id: string }>();
  // Fetch clothing image from backend (MongoDB via API)
  useEffect(() => {
    const fetchClothingImage = async () => {
      try {
        const response = await fetch(`http://localhost:3000/clothingitems/${parseInt(id || '0')}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch clothing image: ${response.statusText}`);
        }
  
        const data = await response.json();  
        setClothingImage(data.attributes);
      } catch (error) {
        setClothingImage("");
        console.error('Error fetching clothing image:', error);
      }
    };
  
    if (id) {
      fetchClothingImage();
    }
  }, [id]);

  return (
    <PoseProvider>
      <div className="relative w-[1920] h-[1000]" style={{ zIndex: 1 }}>
        <CameraFeed />
        <PoseOverlay />
        <ClothingOverlay />
      </div>
    </PoseProvider>
  );
};

export default OOTD;
