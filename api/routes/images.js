const router = require('express').Router();
const Image = require('../models/image');

// https://stackoverflow.com/a/6274398
const shuffle = (array) => {
    let counter = array.length;

    while (counter > 0) {
        const index = Math.floor(Math.random() * counter);
        const temp = array[--counter];

        array[counter] = array[index];
        array[index] = temp;
    }

    return array;
};

router.get('/', async (req, res) => {
    try {
        const images = await Image.find();
        shuffle(images);
        res.status(200).json(images);
    } catch (err) {
        res.status(500).json({ message: err });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const found = await Image.findById(req.params.id);
        res.status(200).json(found);
    } catch (err) {
        res.status(500).json({ message: err });
    }
});

module.exports = router;
