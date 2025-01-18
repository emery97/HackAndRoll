const { MongoClient } = require('mongodb');
const uri = 'mongodb+srv://josephbwanzj:josephwan1*@testresults.szcjd.mongodb.net/';

const getTestCases = async (req, res) => {
    try {
        const client = new MongoClient(uri);
        await client.connect();

        // Access the required databases
        const testCasesDb = client.db('app_testcases');
        const testResultsDb = client.db('app_test_results');

        // Fetch test cases from the 'app_testcases' database
        const testCasesCollection = testCasesDb.collection('testCasesXYZ');
        const testCases = await testCasesCollection.find({}).toArray();

        // Fetch the latest test case statuses from the 'app_test_results' database
        const testResultsCollection = testResultsDb.collection('testResults');

        // Aggregate to find the latest status for each testID
        const latestResults = await testResultsCollection.aggregate([
            { $sort: { endTime: -1 } }, // Sort by most recent timestamp
            {
                $group: {
                    _id: "$testID",          // Group by testID
                    latestStatus: { $first: "$status" }, // Get the latest status
                    latestErrMsg: { $first: { $ifNull: ["$errorLogs", "No Error"] } }
                },
            },
        ]).toArray();

        // Create a map of testID to latest status for quick lookup
        const statusMap = {};
        latestResults.forEach(result => {
            statusMap[result._id] = result.latestStatus;
        });
        const errLogMap = {};
        latestResults.forEach(result => {
            errLogMap[result._id] = result.latestErrMsg;
        });

        // Map test cases with their respective statuses
        const mappedTestCases = testCases.map(testCase => ({
            id: testCase.testID,
            title: testCase.TestCase,
            description: testCase.Description,
            timeTaken: testCase.TimeTaken,
            status: testCase.status || statusMap[testCase.testID] || 'Unknown', // Default to 'Unknown' if no status found
            errorMessage: errLogMap[testCase.testID]
        }));

        // Send the mapped test cases as the response
        res.json(mappedTestCases);

        // Close the database connection
        await client.close();
    } catch (error) {
        console.error('Error fetching test cases:', error);
        res.status(500).send('Server error');
    }
};

module.exports = getTestCases;
