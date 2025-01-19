import React, { useEffect, useState } from 'react';
import CameraFeed from '../components/AR/CameraFeed';
import PoseOverlay from '../components/AR/PoseOverlay';
import ClothingOverlay from '../components/AR/ClothingOverlay';
import { PoseProvider } from '../components/AR/PoseContext';

const OOTD: React.FC = () => {
  // CHANGE
  const clothingImage = null;

  const [aiResponse, setAiResponse] = useState<string | null>(null);
  useEffect(() => {
    console.log("CLOTHING IMAGE:",clothingImage);
  // Fetch data from the /gemini route
  const fetchAIResponse = async () => {
    try {
      const response = await fetch('http://localhost:3000/gemini', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image: clothingImage }), // Send base64 image data
      });
      const data = await response.json();
      setAiResponse(data); // Assuming the backend sends the response as plain text
    } catch (error) {
      console.error('Error fetching AI response:', error);
    }
  };
  fetchAIResponse();
  }, []);


  return (
    <PoseProvider>
      <div className="relative w-[1920] h-[1000]" style={{ zIndex: 1 }}>
        <CameraFeed />
        <PoseOverlay />
        <ClothingOverlay />
        {aiResponse && (
          <div className="absolute top-0 left-0 bg-white p-4 rounded shadow">
            <h3 className="text-lg font-bold">AI Response</h3>
            <p>{aiResponse}</p>
          </div>
        )}
      </div>
    </PoseProvider>
  );
};

export default OOTD;
