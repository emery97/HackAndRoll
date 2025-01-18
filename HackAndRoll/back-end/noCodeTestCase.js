const axios = require('axios');
const { GoogleGenerativeAI } = require("@google/generative-ai");

const noCodeTestCase = async(req, res) =>{
    const genAI = new GoogleGenerativeAI("AIzaSyCHEKKx8hslzY9fYCbLD4jNLd0_DdA-ooM"); // TODO:: Replace the key before final presentation
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const { testCaseName, testCaseDescription, testCaseApplication, testCaseSteps, testCaseExpectedResults } = req.body;

    const prompt = `
        Generate a detailed test case for TestCafe in javascript based on the following information:
        Test Case Name: ${testCaseName}
        Test Case Description: ${testCaseDescription}
        Application: ${testCaseApplication}
        Test Case Steps: ${testCaseSteps}
        Expected Result: ${testCaseExpectedResults}

        IMPORTANT: I ONLY WANT TO SEE THE TEST CASE CODE AND NOTHING ELSE. PLEASE DO NOT INCLUDE ANY OTHER INFORMATION IN THE RESPONSE. AND REMOVE THE JAVASCRIPT BACKTICKS TOO!

        Also add comments for every step in the test case code to explain what is going on as this will be used to allow non-technical users to understand the test case.
    `;

    try {
        // Generate the test case using Gemini
        const result = await model.generateContent(prompt);
        console.log(result.response.text());

        // Send the generated test case back to the frontend
        return res.json({ testCase: result.response.text() });
    } catch (error) {
        console.error('Error generating test case:', error);
        return res.status(500).json({ error: 'Failed to generate test case' });
    }
}

module.exports = noCodeTestCase;