const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

const clothingImageRoutes = require('./ClothingImage');

app.use(cors());
app.use(express.json());

const mongoDbPassword = process.env.MONGODB;
const uri = "mongodb+srv://brayzsg:AxFquySGUdNPeu0gAxFquySGUdNPeu0g@hacknroll.lnosx.mongodb.net/?retryWrites=true&w=majority&appName=hacknroll";

app.post('/image-clothing/save', clothingImageRoutes.saveClothingItem);
app.get('/image-clothing/fetch', clothingImageRoutes.getClothingImage);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});