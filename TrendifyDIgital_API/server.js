const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

app.use(express.json());

// Your routes here
const studentRoutes = require('./routes/studentRoutes');
app.use('/api/students', studentRoutes);

app.listen(5000, () => console.log('Server running on port 5000'));
