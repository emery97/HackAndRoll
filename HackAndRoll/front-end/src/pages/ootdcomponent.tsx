import React from 'react';

interface ClothingItem {
  _id: string;
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
  const tops = items.filter((item) => item.type === 'Shirt');
  const bottoms = items.filter((item) => item.type === 'Pants' || item.type === 'Dress');
  const outerwears = items.filter((item) => item.type === 'Jacket' || item.type === 'Sweater');

  const getRandomItem = (array: ClothingItem[]) => array[Math.floor(Math.random() * array.length)];

  const selectedTop = tops.length ? getRandomItem(tops) : null;
  const selectedBottom = bottoms.length ? getRandomItem(bottoms) : null;
  const selectedOuterwear = outerwears.length ? getRandomItem(outerwears) : null;

  if (!selectedTop || !selectedBottom) {
    return <p style={{ color: 'red', fontWeight: 'bold' }}>Not enough items to create an outfit.</p>;
  }

  return (
    <div style={styles.container}>
      <div style={styles.tempBox}>
        <h3>Temperature</h3>
        <p>High: {temperature?.high}°C</p>
        <p>Low: {temperature?.low}°C</p>
      </div>
      <h2 style={styles.heading}>Outfit Of The Day</h2>
      <div style={styles.grid}>
        <div style={styles.card} key={selectedTop._id} onClick={() => window.location.href = `/ootd/${selectedTop.id}`}>
          <img src={selectedTop.image} alt={selectedTop.name} style={styles.image} />
          <p style={styles.itemName}>{selectedTop.name}</p>
        </div>
        {selectedOuterwear && (
          <div style={styles.card} key={selectedOuterwear._id} onClick={() => window.location.href = `/ootd/${selectedOuterwear.id}`}>
            <img src={selectedOuterwear.image} alt={selectedOuterwear.name} style={styles.image} />
            <p style={styles.itemName}>{selectedOuterwear.name}</p>
          </div>
        )}
        <div style={styles.card} key={selectedBottom._id} onClick={() => window.location.href = `/ootd/${selectedBottom.id}`}>
          <img src={selectedBottom.image} alt={selectedBottom.name} style={styles.image} />
          <p style={styles.itemName}>{selectedBottom.name}</p>
        </div>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    textAlign: 'center',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    minHeight: '100vh',
  },
  tempBox: {
    background: '#ffffff',
    padding: '15px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    display: 'inline-block',
    marginBottom: '20px',
  },
  heading: {
    fontSize: '28px',
    marginBottom: '20px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '20px',
    justifyItems: 'center',
    padding: '0 20px',
  },
  card: {
    background: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    padding: '15px',
    width: '100%',
    maxWidth: '250px',
  },
  image: {
    width: '100%',
    height: 'auto',
    borderRadius: '8px',
    marginBottom: '10px',
  },
  itemName: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#333',
  },
  placeholder: {
    fontSize: '14px',
    color: '#999',
  },
};

export default OOTDCOMPONENT;
