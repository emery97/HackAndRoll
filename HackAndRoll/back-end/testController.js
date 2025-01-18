const { exec } = require('child_process');
const { MongoClient } = require('mongodb');
const browsers = ['chrome', 'firefox', 'edge', 'opera']
const testFolder = '../back-end/test_cases';
//const checkBrowserAvailability = require('./browserController');
const uri = 'mongodb+srv://josephbwanzj:josephwan1*@testresults.szcjd.mongodb.net/'

// Create MongoDB client
const client = new MongoClient(uri);

const runTest = async (req, res) => {
    //res.json({ message: 'Test execution started' });
    /*
    const { continueWithAvailable } = req.body;
    const { availableBrowsers, missingBrowsers } = checkBrowserAvailability();
    if (missingBrowsers.length > 0 && !continueWithAvailable) {
        return res.status(500).json({
            message: 'Some browsers are missing',
            missingBrowsers
        });
    }
    const browsersToUse = availableBrowsers.join(',');
    */
    exec(`testcafe ${browsers} ${testFolder} -- concurrency 2`, async (error, stdout, stderr) => {
        console.log(stdout);
        
        // Example of parsing results and counting passed/failed statuses
        //const passCount = (stdout.match(/Passed/g) || []).length;
        //const failCount = (stdout.match(/Failed/g) || []).length;

        //const passedMatch = stdout.match(/(\d+)\s+passed/);
        //const failedMatch = stdout.match(/(\d+)\s+failed/);

        //const passCount = passedMatch ? parseInt(passedMatch[1]) : 0;
        //const failCount = failedMatch ? parseInt(failedMatch[1]) : 0;

        // Initialize counts
        let passCount = 0;
        let failCount = 0;

        // Split stdout into lines and count the passed/failed test cases
        const lines = stdout.split('\n');

        // Loop through the lines and find the summary
        lines.forEach(line => {
            // Look for a line that has the format 'X/Y failed' in the summary
            const failMatches = line.match(/(\d+)\/(\d+) failed/);
            if (failMatches) {
                // Parse the number of failed and total tests
                failCount = parseInt(failMatches[1]);
                const totalCount = parseInt(failMatches[2]);
                passCount = totalCount - failCount; // Calculate passed tests
            }

            // Look for a line that has the format 'X passed'
            const passMatches = line.match(/(\d+) passed/);
            if (passMatches) {
                // If no failures are found, we can use the passed count to set the passed count
                passCount = parseInt(passMatches[1]);
            }
        });

        const failedTests = [];

        // Regex pattern to find passed and failed tests
        const failedTestPattern = /testID: (\d+),\s*testName: '(.*)',\s*status: 'Failed'/g;
        let match;
        
        // Loop through all failed tests in the stdout
        while ((match = failedTestPattern.exec(stdout)) !== null) {
            const testID = match[1];  // The test ID of the failed test
            const testName = match[2]; // The test name of the failed test
            
            // Store the failed tests grouped by testID
            failedTests.push({ testID, testName });
        }
        
        // Determine status based on pass/fail counts
        const status = failCount > 0 ? 'Failed' : 'Passed';

        // Connect to MongoDB
        await client.connect();
        const db = client.db('app_testhistory'); // use your DB name
        const historyCollection = db.collection('testHistory');

        // Find the highest current historyId (assuming historyId is a number)
        const lastEntry = await historyCollection.find().sort({ historyId: -1 }).limit(1).toArray();
        const newHistoryId = lastEntry.length > 0 ? lastEntry[0].historyId + 1 : 1; // Increment the last ID or start at 1 if none exist

        // Create a new history entry
        const historyEntry = {
            historyId: newHistoryId, // Use the incremented ID
            dateTime: new Date(),
            status: status, // Set the status to 'Passed' or 'Failed'
            passed: passCount,
            failed: failCount,
            failedTests: failedTests,
        };

        // Save the history entry to MongoDB
        await historyCollection.insertOne(historyEntry);

        if (error) {
            console.error(`Error executing test: ${error.message}`);
            return res.status(500).json({ message: 'Test execution failed', error: error.message });
        }

        if (stderr) {
            console.error(`stderr: ${stderr}`);
            return res.status(500).json({ message: 'Test completed with errors', stderr });
        }

        console.log(`stdout: ${stdout}`);
        return res.json({ message: 'Test executed successfully', output: stdout });
    });
};

const runSelectedTest = (req, res) => {
    /*
    const { testCases, continueWithAvailable } = req.body;
    const { availableBrowsers, missingBrowsers } = checkBrowserAvailability();

    if (missingBrowsers.length > 0 && !continueWithAvailable) {
        return res.status(500).json({
            message: 'Some browsers are missing',
            missingBrowsers
        });
    }
    const browsersToUse = availableBrowsers.join(',');
    */
    const { testCases } = req.body;
    const testCaseFiles = testCases.map(testCase => `${testFolder}/${testCase}`).join(' ');
    exec(`testcafe ${browsers} ${testCaseFiles} -- concurrency 2`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing test: ${error.message}`);
            return res.status(500).json({ message: 'Test execution failed', error: error.message });
        }

        if (stderr) {
            console.error(`stderr: ${stderr}`);
            return res.status(500).json({ message: 'Test completed with errors', stderr });
        }

        console.log(`stdout: ${stdout}`);
        return res.json({ message: 'Test executed successfully', output: stdout });
    });
};

module.exports = { runTest , runSelectedTest }; 