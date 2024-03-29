const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
require('dotenv').config();

const mongoose = require('mongoose');
const { mongoUrl } = require('./keys');
require('./models/User');
const authRoutes = require('./routes/authRoutes');
const requireAuth = require('./middleware/requireAuthToken');

mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on('connected', () => {
    console.log('Connected to database');
});

mongoose.connection.on('error', (err) => {
    console.log('Failed to connect to database', err);
})

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(authRoutes);

app.get('/', requireAuth, (req, res) => {
    res.json({ email: req.user.email });
});

app.listen(process.env.PORT, () => { console.log("Server running") });