const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");
const multer = require("multer");

// Setup Multer for file upload handling
const upload = multer({ dest: "uploads/" }); // This will store uploaded files in the 'uploads' folder

// Your function to handle the request and send it to Gemini
const getGemini = async (req, res) => {
    console.log("Received file:", req.files.image);

    try {
        // Check if file was uploaded
        if (!req.file) {
            return res.status(400).json({ error: "Image file is required" });
        }

        const filePath = req.file.path;
        const fileBuffer = fs.readFileSync(filePath);

        
        const formData = new FormData();
        formData.append("file", fileBuffer, req.files.image.data); // Add the file to FormData

        // Send the file to Gemini API
        const response = await axios.post(
            "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyAeHcJaKcYl7tz6YllL2axOB3SzGklIzZE",
            formData,
            {
              headers: {
                ...formData.getHeaders(), // Get the proper headers for the form data
              },
            }
          );

        // Clean up the uploaded file after processing
        fs.unlinkSync(filePath); 

        // Send response back to client
        res.json({ response: response.data });
    } catch (error) {
        console.error("Error uploading file:", error);
        res.status(500).json({ error: "Server error" });
    }
};

// Route to handle file upload
const uploadFileHandler = upload.single("image"); // "image" is the name of the form field

module.exports = { getGemini, uploadFileHandler };
