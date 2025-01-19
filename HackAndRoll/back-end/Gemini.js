const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

const getGemini = async (req, res) => {
    try {
        // Extract base64 image from the request body
        const { image } = req.body;

        if (!image) {
            return res.status(400).json({ error: 'Base64 image data is required' });
        }


        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        console.log(`\n\n\n\n\n\n ${image} \n\n\n\n\n\n`);
        // Construct your prompt (or modify based on the received base64)
        const prompt = `Analyze the content of the provided image it is in base64 ${image}...`;

        const result = await model.generateContent(prompt);

        return res.json({ response: result.response.text() });
    } catch (error) {
        console.error('Error connecting to gemini:', error);
        return res.status(500).json({ error: 'Server error' });
    }
};



module.exports = { getGemini }; 
