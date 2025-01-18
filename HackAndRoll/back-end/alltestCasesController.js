// controllers/alltestCasesController.js
const { MongoClient } = require('mongodb');
const uri = 'mongodb+srv://josephbwanzj:josephwan1*@testresults.szcjd.mongodb.net/';

const getAllTestCases = async (req, res) => {
    try {
        const client = new MongoClient(uri);
        await client.connect();
        const database = client.db('app_testcases');
        const collection = database.collection('testCasesXYZ');
        const testCases = await collection.find({}).toArray();
        const mappedTestCases = testCases.map(testCase => {
            let status;
            if (testCase.SuccessRate === 100) {status = "Passed";
            } else if (testCase.SuccessRate === 0) {
                status = "Failed";
            } else {
                status = "Pending";
            }
        
            return {
                id: testCase.testID,
                title: testCase.TestCase,
                description: testCase.Description,
                timeTaken: testCase.TimeTaken,
                status: status,
                successRate: testCase.SuccessRate,
                dateAdded: testCase.DateAdded,
                reporter: testCase.Reporter,
            };
            });
            res.json(mappedTestCases);
        await client.close();
    } catch (error) {
        console.error('Error fetching test cases:', error);
        res.status(500).send('Server error');
    }
};

module.exports = getAllTestCases;
