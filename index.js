require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const router = require('./router/index');
const errorMiddleware = require('./middlewares/error-middleware');

const PORT = process.env.PORT || 8000;
const app = express();
let value = 1;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: '*',
  credentials: true,
  exposedHeaders: ["set-cookie"]
}));
app.use('/stat', (req, res) => {
  value = value + 1
  res.json(value);
});
app.use('/about', (req, res) => {
  res.send('<h3> Hello , Kirill Ateev</h3>');
});
app.use('/api', router);
app.use('/', (req, res) => {
  res.json(value);
});

app.use(errorMiddleware);

const start = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    app.listen(PORT, () => console.log(`Server started on PORT = ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
