const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload'); 
const cors = require('cors');
const personRoutes = require('./routes/person.routes');

const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(fileUpload()); 

app.use(cors());

const mongoUrl = 'mongodb://localhost:27017/Persondb';

mongoose
  .connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .catch(() => {
    console.error('Unable to connect to MongoDB');
  });

app.use('/persons', personRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

module.exports = app;
