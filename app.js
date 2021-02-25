const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json({ extended: false }));
app.use(cors());

app.use('/api/v1/auth', require('./routes/auth'));
app.use('/api/v1/users', require('./routes/users'));

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

module.exports = server;
