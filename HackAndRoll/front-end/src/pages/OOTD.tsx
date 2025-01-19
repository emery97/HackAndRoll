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

  const [aiResponse, setAiResponse] = useState<string | null>(null);
  useEffect(() => {
    if (!clothingImage) return; // Exit early if `clothingImage` is null or empty
  
    const fetchAIResponse = async () => {
      try {
        const response = await fetch('http://localhost:3000/gemini', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ image: clothingImage }), // Send base64 image data
        });

        console.log("CLOTHING IMAGE: ",clothingImage);
        if (!response.ok) {
          throw new Error(`Failed to fetch AI response: ${response.statusText}`);
        }
  
        const data = await response.json();
        console.log(data);
        setAiResponse(data); // Assuming the backend sends the response as plain text
      } catch (error) {
        console.error('Error fetching AI response:', error);
      }
    };
  
    fetchAIResponse();
  }, [clothingImage]); // Run when `clothingImage` changes
  
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
