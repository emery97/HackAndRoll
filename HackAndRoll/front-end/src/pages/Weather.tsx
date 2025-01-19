
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import OOTDCOMPONENT from './ootdcomponent';


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

const Weather: React.FC = () => {

interface Temperature {
    low: number;
    high: number;
}   

const [temperature, setTemperature] = useState<Temperature | null>(null);
  
  const fetchTemperature = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/nextday-temperature');
      const tempData: Temperature = {
        low: response.data.temperature.low,
        high: response.data.temperature.high,
      };
      setTemperature(tempData);
    } catch (error) {
      console.error('Error fetching temperature data:', error);
    }
  };

  const [items, setItems] = useState<ClothingItem[]>([]);
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('http://localhost:3000/clothingitems');
        //setItems(response.data);
        const fetchedItems = response.data.map((item: any): ClothingItem => ({
          _id: item._id,
          id: item.id,
          type: item.type,
          name: item.name,
          color: item.color,
          formal: item.formal,
          temperatureRange: item.temperatureRange,
          lastWorn: item.lastWorn,
          image: item.attributes,
        }));
        setItems(fetchedItems);

      } catch (error) {
        console.error('Error fetching clothing items:', error);
      }
    };
    fetchTemperature();

    fetchItems();
  }, []);

  return (
    <div>
        <OOTDCOMPONENT items={items} temperature={temperature} />
    </div>
  );
};

export default Weather;
