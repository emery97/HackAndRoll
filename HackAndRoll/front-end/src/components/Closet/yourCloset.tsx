// src/Closet.tsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Closet.css'; // Create and style as needed

interface ClothingItem {
  _id: string;
  id?: number;
  type: string;
  name: string;
  color: string;
  formal: string | boolean;
  temperatureRange: string | { min: number; max: number };
  lastWorn: string;
  image: string;
}

const Closet: React.FC = () => {
  const [items, setItems] = useState<ClothingItem[]>([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/clothingitems');
        setItems(response.data);
      } catch (error) {
        console.error('Error fetching clothing items:', error);
      }
    };
    fetchItems();
  }, []);

  return (
    <div className="carousel-container">
      {items.map(item => (
        <div className="clothing-box" key={item._id}>
          {item.image ? (
            <img src={item.image} alt={item.name} className="clothing-image" />
          ) : (
            <div className="placeholder-image">No Image</div>
          )}
          <div className="clothing-details">
            <h3>{item.name}</h3>
            <p>Type: {item.type}</p>
            <p>Color: {item.color}</p>
            <p>Formal: {item.formal.toString()}</p>
            <p>Temp Range: {typeof item.temperatureRange === 'string' ? item.temperatureRange : `${item.temperatureRange.min}-${item.temperatureRange.max}`}</p>
            <p>Last Worn: {new Date(item.lastWorn).toLocaleDateString()}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Closet;
