const express = require('express');
const router = express.Router();
'use strict';

const Images = require('./images');
const Containers = require('./containers');


router.get('/', (req, res) => {
    res.send('Images');
});

router.get('/images', (req, res) => {
    const images = new Images();
    images.getImages().then(images => {
        res.json(images);
    })
});

router.get('/containers', (req, res) => {
    const containers = new Containers();
    containers.getContainers()
        .then(containers => res.json(containers))
});

router.post('/containers', (req, res) => {

});



module.exports = router;