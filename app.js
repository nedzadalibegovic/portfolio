const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const imagesRoute = require('./api/routes/images');

const app = express();

// middlewares
app.use(cors());
app.use('/api/v1/images', imagesRoute);

// routes
app.get('/', (req,res) => {
    res.redirect('/api/v1/images');
});

mongoose.connect(process.env.MONGO, { useUnifiedTopology: true, useNewUrlParser: true });

app.listen(process.env.PORT);