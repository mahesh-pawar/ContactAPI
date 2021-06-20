const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const contact_routes = require('./routes/contacts');
require('dotenv/config');

app.use(bodyParser.json())
app.use('/contacts', contact_routes);

app.get('*', (req, res) => {
    res.json({ success: false, message: 'Resource not found!' })
})

mongoose.connect(
    process.env.DB_CONNECTION,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
        console.log('Connected to DB!');
    }
)

app.listen(3000)