const cors = require("cors");
const express = require("express");
const session = require("express-session");
const pg = require('pg');
const pgSession = require('connect-pg-simple')(session);
const bodyParser = require('body-parser');
const cookiesMiddleware = require('universal-cookie-express');

require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

const pgPool = new pg.Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

const sessionConfig = {
  secret: 'E1gQQ9How3brKZrtv0lU5g==',
  resave: false,
  rolling: true,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 * 24, secure: false, httpOnly: false },
  store: new pgSession({
    pool: pgPool,
    tableName: 'session',
  }),
};

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
app.use(cookiesMiddleware());
app.use(bodyParser.json());
app.use(session(sessionConfig));

const userRoutes = require('./routes/user');
const authRoutes = require('./routes/auth')
const exerciseRoutes = require('./routes/exercise')
const workoutplanRoutes = require('./routes/workoutplan')
const exerciseDataRoutes = require('./routes/exerciseData')
const postRoutes = require('./routes/post')


app.use('/api',userRoutes,authRoutes,exerciseRoutes,workoutplanRoutes,exerciseDataRoutes,postRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
