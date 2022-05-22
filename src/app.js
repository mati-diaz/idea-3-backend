const express = require('express');
const cors = require('cors');
require('dotenv').config();
require('./database');

const app = express();
const port = process.env.PORT;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use('/api', require('./routes/index'));

app.listen(port, () => {
  console.log(`app listening on http://localhost:${port}/api/`)
});