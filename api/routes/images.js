const express = require('express');
const Image = require('../models/image');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        let images = await Image.find();
        res.status(200).json(images);
    } catch (err) {
        res.status(500).json({ message: err });
    }
});

router.get('/:id', async (req, res) => {
    try {
        let found = await Image.findById(req.params.id);
        res.status(200).json(found);
    } catch (err) {
        res.status(500).json({ message: err });
    }
});

module.exports = router;