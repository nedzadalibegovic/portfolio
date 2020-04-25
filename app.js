const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const imagesRoute = require('./api/routes/images');

const app = express();

// middlewares
app.use(cors({ origin: 'https://www.nedzadalibegovic.com' }));
app.use('/', imagesRoute);

mongoose.connect(process.env.MONGO, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});

app.listen(process.env.PORT);
