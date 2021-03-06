const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const contactRoutes = require('./routes/contacts');
const userRoutes = require('./routes/users');
require('dotenv/config');
const basicAuthentication = require('./authentication');

app.use(bodyParser.json())
app.use('/users', userRoutes);
app.use(basicAuthentication);
app.use('/contacts', contactRoutes);

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