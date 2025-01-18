const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { MongoClient } = require('mongodb');

// MongoDB connection string
const uri = 'mongodb+srv://josephbwanzj:josephwan1*@testresults.szcjd.mongodb.net/';

// MongoDB client
let db;

// Connect to MongoDB Atlas
MongoClient.connect(uri)
  .then(client => {
    db = client.db('app_account_data'); 
    console.log('Successfully connected to the app_account_data database');
  })
  .catch((err) => console.log('MongoDB connection error:', err));

const signIn = async (req, res) => {
    const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required.' });
  }

  try {
    const user = await db.collection('accountData').findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Invalid username or password.' });
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid username or password.'});

    }
    // Generate a JWT token
    const token = jwt.sign({ id: user._id }, 'jwt_secret', { expiresIn: '1h' });
    return res.status(200).json({ message: 'Login successful', token });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error. Please try again later.' });
  };
}

module.exports = signIn;