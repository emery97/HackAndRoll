const { MongoClient } = require('mongodb');

// Create a connection to the MongoDB database
const client = new MongoClient('mongodb+srv://josephbwanzj:josephwan1*@testresults.szcjd.mongodb.net/');

const getTestCaseStatusByBrowser = async (req, res) => {
  try {
    await client.connect(); // Connect to the database
    const database = client.db('app_test_results');
    const collection = database.collection('testResults'); // The collection where test results are stored

    // Aggregate the data based on browser and status
    const pipeline = [
      {
        $group: {
          _id: { browser: '$browser.name', status: '$status' },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { '_id.browser': 1, '_id.status': 1 } // Sort by browser and status
      }
    ];

    const results = await collection.aggregate(pipeline).toArray();
    const browserStatusData = {
      //chromium: [0, 0, 0],
      chrome: [0, 0, 0],
      //'chrome-canary': [0, 0, 0],
      'microsoft edge': [0, 0, 0],
      firefox: [0, 0, 0],
      opera: [0, 0, 0],
      //safari: [0, 0, 0],
    };

    // Map the results into the format we need
    results.forEach(result => {
      const { browser, status } = result._id;
      const statusIndex = status === 'Passed' ? 0 : status === 'Pending' ? 1 : 2;

      // If the browser exists, increment the appropriate status count
      if (browserStatusData[browser.toLowerCase()]) {
        browserStatusData[browser.toLowerCase()][statusIndex] += result.count;
      }
    });

    // Send the formatted data as a response
    res.json(browserStatusData);
  } catch (error) {
    console.error('Error fetching test case status:', error);
    res.status(500).json({ message: 'Error fetching test case status' });
  } finally {
    await client.close(); // Close the database connection
  }
};

module.exports = getTestCaseStatusByBrowser;
