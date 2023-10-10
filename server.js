const cors = require("cors")
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;


// Middleware to parse JSON requests
app.use(express.json());
app.use(cors())
// Import and use user routes
const userRoutes = require('./routes/user');
app.use('/api', userRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

