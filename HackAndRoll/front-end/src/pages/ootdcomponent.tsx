import React, { useState, useEffect } from 'react';
import axios from 'axios';

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

interface Temperature {
  low: number;
  high: number;
}

interface OOTDProps {
  items: ClothingItem[];
  temperature: Temperature | null;
}

const OOTDCOMPONENT: React.FC<OOTDProps> = ({ items, temperature }) => {
  
  

  // Filter items by type
  const tops = items.filter(item => item.type === 'Shirt');
  const bottoms = items.filter(item => item.type === 'Pants' || item.type === 'Dress');
  const outerwears = items.filter(item => item.type === 'Jacket' || item.type === 'Sweater');
  
  // Function to get a random item from an array
  const getRandomItem = (array: ClothingItem[]) => {
    return array[Math.floor(Math.random() * array.length)];
  };

  // Select items
  const selectedTop = tops.length ? getRandomItem(tops) : null;
  const selectedBottom = bottoms.length ? getRandomItem(bottoms) : null;
  const selectedOuterwear = outerwears.length ? getRandomItem(outerwears) : null;

  if (!selectedTop || !selectedBottom) {
    return <p>Not enough items to create an outfit.</p>;
  }

  return (
    <div style={styles.container}>
      <div>
        <h2>Temperature High: {temperature?.high}</h2>
        <h2>Temperature Low: {temperature?.low}</h2>
      </div>
      <h2>Outfit Of The Day</h2>
      <div style={styles.grid}>
        {/* Top Left: Shirt */}
        <div style={styles.gridItem}>
          <img
            src={selectedTop.image}
            alt={selectedTop.name}
            style={styles.image}
          />
          <p>{selectedTop.name}</p>
        </div>

        {/* Top Right: Outerwear */}
        {selectedOuterwear && (
          <div style={styles.gridItem}>
            <img
              src={selectedOuterwear.image}
              alt={selectedOuterwear.name}
              style={styles.image}
            />
            <p>{selectedOuterwear.name}</p>
          </div>
        )}

        {/* Bottom Left: Pants */}
        <div style={styles.gridItem}>
          <img
            src={selectedBottom.image}
            alt={selectedBottom.name}
            style={styles.image}
          />
          <p>{selectedBottom.name}</p>
        </div>

        {/* Bottom Right: Optional Placeholder */}
        <div style={styles.gridItem}>
          {/* You can leave this empty or add another accessory */}
        </div>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    textAlign: 'center',
    marginTop: '20px',
    height: '100vh', // Full viewport height

  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridTemplateRows: 'auto auto',
    gap: '20px',
    justifyItems: 'center',
    alignItems: 'center',
    marginTop: '20px',
    width: '80%', // Adjust as needed
    height: '80%', // Adjust to make grid taller
  },
  gridItem: {
    display: 'flex',
    flexDirection: 'column' as 'column',
    alignItems: 'center',
  },
  image: {
    width: '100%', // Make images responsive within grid items
    height: 'auto',
    maxHeight: '100%', // Prevent images from overflowing
    objectFit: 'cover' as 'cover',
    borderRadius: '8px',
  },
};

export default OOTDCOMPONENT;
