const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors()); // Enable Cross-Origin Resource Sharing (CORS) for all routes
app.use(express.json()); // Parse JSON bodies for all incoming requests

// MongoDB connection URI
const uri = 'mongodb+srv://Student:webdev2024student@cluster0.uqyflra.mongodb.net/webdev2024';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

let productsCollection;

// Connect to MongoDB
client.connect(err => {
  if (err) {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1); // Exit the process with failure code
  }

  const db = client.db('webdev2024');
  productsCollection = db.collection('final_EliyahuAlhazov_MichaelMiron');
  console.log('Connected to MongoDB');

  // Load initial products data from JSON file
  const productsFilePath = path.join(__dirname, 'products.json');
  fs.readFile(productsFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading products file:', err);
      return;
    }

    const products = JSON.parse(data);
    productsCollection.insertMany(products, (err, result) => {
      if (err) {
        console.error('Error inserting products:', err);
      } else {
        console.log('Inserted products:', result.insertedCount);
      }
    });
  });
});

// Fetch products
app.get('/api/products', async (req, res) => {
  try {
    const products = await productsCollection.find().toArray(); // Fetch all products from the collection
    res.json(products); // Send the products as a JSON response
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal Server Error' }); // Send a 500 Internal Server Error response
  }
});

// Place order
app.post('/api/orders', async (req, res) => {
  try {
    const order = req.body;
    const db = client.db('webdev2024');
    const result = await db.collection('orders').insertOne(order); // Insert the order into the orders collection
    res.status(201).json(result.ops[0]); // Send the inserted order as a JSON response
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).json({ error: 'Internal Server Error' }); // Send a 500 Internal Server Error response
  }
});

const PORT = process.env.PORT || 5001; // Set the port to the value of the PORT environment variable or default to 5001
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

