const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json({ limit: "50mb" })); // To handle base64 images

const mongoDbPassword = process.env.MONGODB;
const uri = "mongodb+srv://brayzsg:AxFquySGUdNPeu0gAxFquySGUdNPeu0g@hacknroll.lnosx.mongodb.net/?retryWrites=true&w=majority&appName=hacknroll";

app.post("/save-photo", (req, res) => {
    const { imageData, filename } = req.body;

    // Decode base64 image
    const base64Data = imageData.replace(/^data:image\/png;base64,/, "");
    
    // Define the path to save the image
    const filePath = path.join(__dirname, "public", "clothes", filename);

    // Write the file to the folder
    fs.writeFile(filePath, base64Data, "base64", (err) => {
        if (err) {
            console.error("Error saving photo:", err);
            return res.status(500).send("Error saving photo.");
        }
        
        // Respond with the URL of the saved photo
        res.json({
            downloadUrl: `http://localhost:${PORT}/clothes/${filename}`,
        });
    });
});

app.use("/clothes", express.static(path.join(__dirname, "public", "clothes")));


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});