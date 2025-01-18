const { MongoClient } = require('mongodb');
const ClothingItem = require('./ClothingItem'); // Assuming ClothingItem is a valid model

const uri = "mongodb+srv://brayzsg:Z3EbpLzSxY9jj8qM@hacknroll.lnosx.mongodb.net/?retryWrites=true&w=majority&appName=hacknroll";

// Fetch clothing image
const getClothingImage = async (req, res) => {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const database = client.db('chioset');
    const collection = database.collection('closet');
    const image = await collection.findOne({});
    
    if (image) {
      res.json({ image: image.image.toString('base64') });
    } else {
      return res.status(404).json({ message: 'Clothing image not found' });
    }
  } catch (error) {
    console.error('Error fetching clothing image:', error);
    return res.status(500).json({ error: 'Server error' });
  } finally {
    await client.close();
  }
};

// Save clothing item with image
const saveClothingItem = async (req, res) => {
  const { id, type, name, color, formal, temperatureRange, lastWorn, attributes, image } = req.body;

  // Validate the required fields
  if (!id || !type || !name || !color || !temperatureRange || !lastWorn) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    let encodedImage = null;
    
    if (image) {
      // If image is provided as a base64 string, decode it to a binary buffer
      encodedImage = Buffer.from(image, 'base64');
    }

    const clothingItem = new ClothingItem(id, type, name, color, formal, temperatureRange, lastWorn, attributes, encodedImage);

    const client = new MongoClient(uri);
    await client.connect();
    const database = client.db('chioset');
    const collection = database.collection('closet');

    const result = await collection.insertOne(clothingItem);
    return res.status(201).json({ message: 'Clothing item added successfully', itemId: result.insertedId });
  } catch (error) {
    console.error('Error saving clothing item:', error);
    return res.status(500).json({ message: 'Server error' });
  } finally {
    await client.close();
  }
};

module.exports = { getClothingImage, saveClothingItem };
