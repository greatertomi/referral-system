const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const winston = require('./config/winston');
require('dotenv').config();

const app = express();

app.use(express.json({ extended: false }));
app.use(cors());
app.use(morgan('combined', { stream: winston.stream }));

app.use('/api/v1/auth', require('./routes/auth'));
app.use('/api/v1/users', require('./routes/users'));

const { PORT } = process.env;
const server = app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

module.exports = server;
