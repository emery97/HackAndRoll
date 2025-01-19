const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

const getGemini = async (req, res) => {
    try{
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
        const prompt = "Explain how AI works";
    
        const result = await model.generateContent(prompt);
        return res.json({ response: result.response.text() });
    }catch(error){
        console.error('Error connecting to gemini:', error);
        return res.status(500).json({ error: 'Server error' });
    }
}

module.exports = { getGemini }; 
