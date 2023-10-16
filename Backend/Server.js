const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = 5000; // Change as needed
const path = require('path');

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/newdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define a schema for the "connect" collection
const doctorSchema = new mongoose.Schema({
  Id:Number,
  City: String,
  Speciality: String,
  Doctor_Name: String,
  Hospital_Name: String,
  // Add more fields as needed
});

const Doctor = mongoose.model('newdb', doctorSchema, 'Doctor');

app.get('/',async(req,res)=> {
    console.log('Connected');
})
app.post('/search', async (req, res) => {
  const { City, Speciality } = req.body;

  try {
    // Search for records in the "connect" collection
    const searchResults = await Doctor.find({ City, Speciality });

    res.json(searchResults);
    console.log(searchResults);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
