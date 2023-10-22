const cors = require("cors")
const express = require("express");
const session = require("express-session")
const MySQLStore = require('express-mysql-session')(session);
const bodyParser = require('body-parser');
const cookiesMiddleware = require('universal-cookie-express');

require('dotenv').config(); // Import dotenv and load the variables
const app = express();
const port = process.env.PORT || 5000;

const sessionStore = new MySQLStore({
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
});



app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
app.use(cookiesMiddleware())
app.use(bodyParser.json());
app.use(session({
secret:'E1gQQ9How3brKZrtv0lU5g==',
resave: false,
saveUninitialized: false,
cookie:{maxAge: 1000*60*60*24,secure:false,httpOnly:false},
store:sessionStore,
}));

const userRoutes = require('./routes/user');
app.use('/api', userRoutes);


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

