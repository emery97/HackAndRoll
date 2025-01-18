const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://josephbwanzj:josephwan1*@testresults.szcjd.mongodb.net/';
const client = new MongoClient(uri);
const dbName = 'app_test_results'; 

const getTestCaseStatus = async (req, res) => {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
    
        const database = client.db(dbName); 
        const collection = database.collection('testResults'); 
    
        // Query the database and group by status
        const statuses = await collection.aggregate([
            {
                $group: {
                    _id: "$status",  // Grouping by the status field
                    count: { $sum: 1 }  // Counting the occurrences of each status
                }
            }
        ]).toArray();

        const totalTestCases = statuses.reduce((acc, status) => acc + status.count, 0);
    
        // Log the raw statuses from the aggregation
        console.log('Aggregated Statuses:', statuses);
    
        if (statuses.length === 0) {
            return res.status(200).json([]);
        }
    
        // Format the response as per your chart data
        const formattedStatuses = statuses.map(status => {
            let color;
            switch (status._id) {
            case "Passed":
                color = "#28a745"; // Green
                break;
            case "Pending":
                color = "#ffc107"; // Yellow
                break;
            case "Failed":
                color = "#dc3545"; // Red
                break;
            default:
                color = "#6c757d"; // Gray for unexpected statuses
            }

            const percentage = (status.count / totalTestCases) * 100;

            return {
                name: status._id,
                value: percentage.toFixed(2),
                color: color
            };
        });
        
        // Return the formatted statuses
        res.status(200).json(formattedStatuses);
    } catch (error) {
        console.error("Error in getting test case status:", error);
        res.status(500).json({ message: "Internal Server Error" });
    } finally {
        await client.close(); 
    }
};

module.exports = getTestCaseStatus;
