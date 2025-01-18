const express = require('express');//yield
const cors = require('cors');
const axios = require('axios');
const { MongoClient, GridFSBucket } = require('mongodb');
const ClothingItem = require('./ClothingItem'); // Import your ClothingItem class

const app = express();
const PORT = 3000;

const FormData = require('form-data'); // For handling form data
const fetch = require('node-fetch');

const clothingImageRoutes = require('./ClothingImage');


app.use(cors());
app.use(express.json({ limit: "50mb" })); // To handle base64 images
app.use(
  cors({
    origin: "http://localhost:5173", // Your frontend's URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

async function removeBg(base64Image) {
  // Remove data URL prefix if present
  const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, '');
  
  // Convert Base64 to Buffer
  const imageBuffer = Buffer.from(base64Data, 'base64');

  // Prepare FormData
  const form = new FormData();
  form.append('size', 'auto');
  form.append('image_file', imageBuffer, {
    filename: 'image.png',
    contentType: 'image/png',
  });

  // Send POST request to Remove.bg
  const response = await fetch('https://api.remove.bg/v1.0/removebg', {
    method: 'POST',
    headers: {
      'X-Api-Key': 'EVDhwfcWygnRUKFvci5i7sDa',
      ...form.getHeaders(),
    },
    body: form,
  });

  if (response.ok) {
    const buffer = await response.buffer();
    // Convert Buffer to Base64
    return `data:image/png;base64,${buffer.toString('base64')}`;
  } else {
    const error = await response.text();
    throw new Error(`Error ${response.status}: ${response.statusText} - ${error}`);
  }
}

// POST Route to Remove Background
app.post('/removebg', async (req, res) => {
  try {

    const { base64Image } = req.body;
    if (!base64Image) {
      return res.status(400).json({ error: 'base64Image is required' });
    }

    const resultBase64 = await removeBg(base64Image);
    res.json({ image: resultBase64 });
  } catch (error) {
    console.error('Background removal error:', error.message);
    res.status(500).json({ error: error.message });
  }
});
const mongoDbPassword = process.env.MONGODB;

app.post('/image-clothing/save', clothingImageRoutes.saveClothingItem);
app.get('/image-clothing/fetch', clothingImageRoutes.getClothingImage);
app.get('/api/get-clothes', )
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

const getTomorrowDate = () => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const year = tomorrow.getFullYear();
    const month = String(tomorrow.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(tomorrow.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
};
  
  /**
   * Route: GET /api/nextday-temperature
   * Description: Fetches the temperature (low and high) for the next day
   */
app.get('/api/nextday-temperature', async (req, res) => {
    try {
        // API endpoint for 4-day weather forecast
        const WEATHER_API_URL = 'https://api.data.gov.sg/v1/environment/4-day-weather-forecast';

        // Make a GET request to the weather API
        const response = await axios.get(WEATHER_API_URL);

        // Check if the response status is OK
        if (response.status !== 200) {
        return res.status(response.status).json({ error: 'Failed to fetch weather data' });
        }

        const data = response.data;

        // Extract the forecasts array
        const forecasts = data.items[0].forecasts;

        // Get tomorrow's date
        const tomorrowDate = getTomorrowDate();

        // Find the forecast for tomorrow
        const tomorrowForecast = forecasts.find(forecast => forecast.date === tomorrowDate);

        // If forecast for tomorrow is not found, return an error
        if (!tomorrowForecast) {
        return res.status(404).json({ error: 'Tomorrow\'s forecast not available' });
        }

        // Extract low and high temperatures
        const lowTemp = tomorrowForecast.temperature.low;
        const highTemp = tomorrowForecast.temperature.high;

        // Optionally, extract other relevant data
        const weatherDescription = tomorrowForecast.forecast;
        const relativeHumidity = tomorrowForecast.relative_humidity;
        const wind = tomorrowForecast.wind;

        // Construct the response object
        const temperatureData = {
        date: tomorrowDate,
        temperature: {
            low: lowTemp,
            high: highTemp
        },
        forecast: weatherDescription,
        relative_humidity: relativeHumidity,
        wind: wind
        };

        // Send the temperature data as JSON
        res.json(temperatureData);

    } catch (error) {
        console.error('Error fetching weather data:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// MongoDB Connection URI and Database/Collection Names
const uri = "mongodb+srv://admin:adminpassword@hacknroll.lnosx.mongodb.net/?retryWrites=true&w=majority&appName=hacknroll";
const dbName = 'chioset';
const collectionName = 'closet';
let db, closetCollection;

const client = new MongoClient(uri, { useUnifiedTopology: true });

const connectToMongo = async () => {
    try {
        console.log("TEST");
        await client.connect();
        console.log('Connected successfully to MongoDB');
        db = client.db(dbName);
        closetCollection = db.collection('closet');
        // Create unique index on 'id' field
        await closetCollection.createIndex({ id: 1 }, { unique: true });
    } catch (err) {
      console.error('MongoDB connection error:', err);
      process.exit(1); // Exit process with failure
    }
  };

connectToMongo();
// Create a new MongoClient

//uploadImage();

// Helper function to create and insert a new ClothingItem
const addClothingItem = async (itemData) => {
  // Destructure the itemData
  const {
    id,
    type,
    name,
    color,
    formal,
    temperatureRange,
    lastWorn,
    imagebase64
  } = itemData;

  // Create a new ClothingItem instance
  const newItem = new ClothingItem(
    id,
    type,
    name,
    color,
    formal,
    temperatureRange,
    lastWorn,
    imagebase64
  );

  // Convert the lastWorn to a Date object if it's a string
  if (typeof newItem.lastWorn === 'string') {
    newItem.lastWorn = new Date(newItem.lastWorn);
  }

  try {
    // Insert the new item into the closet collection
    const result = await closetCollection.insertOne(newItem);
    console.log('Inserted new ClothingItem:', result.insertedId);
    return result;
  } catch (err) {
    throw err;
  }
};

app.get('/clothingitems', async (req, res) => {
  try {
    const items = await closetCollection.find().toArray();
    res.json(items);
  } catch (error) {
    console.error('Error fetching clothing items:', error);
    res.status(500).json({ error: 'Failed to fetch clothing items.' });
  }
});

// Route: POST /api/clothingitems
// Description: Adds a new ClothingItem to the MongoDB closet collection
app.post('/clothingitems', async (req, res) => {
  try {
    const itemData = req.body;

    // Validate required fields
    const requiredFields = ['id', 'type', 'name', 'color', 'formal', 'temperatureRange', 'lastWorn', 'imagebase64'];
    const missingFields = requiredFields.filter(field => !(field in itemData));

    if (missingFields.length > 0) {
      return res.status(400).json({
        error: `Missing required fields: ${missingFields.join(', ')}`
      });
    }

    // Add the ClothingItem to MongoDB
    const result = await addClothingItem(itemData);

    // Respond with the inserted document's ID
    res.status(201).json({
      message: 'Clothing item added successfully',
      insertedId: result.insertedId
    });
  } catch (error) {
    console.error('Error adding clothing item:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

