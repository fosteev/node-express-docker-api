const express = require('express');
const router = express.Router();
'use strict';

const Images = require('./images');
const Containers = require('./containers');


router.get('/', (req, res) => {
    res.send('images');
});

router.get('/images', (req, res) => {
    const images  = new Images();
    images.getImages().then(imgs => {
        res.json(imgs);
    })
});

router.get('/containers', (req, res) => {
    const containers = new Containers(docker);
    containers.getContainers().then(cntrs => res.json(cntrs));
});

router.post('/containers', (req, res) => {
    const {id, image, container_port, exposed_port, name} = req.query;

    if (!(container_port && exposed_port && image, name)) {
        res.status(403).send('Not have params');
    }

    const containers = new Containers(docker);
    containers.setContainer(image, container_port, exposed_port, name)
        .then(json => res.json(json))
        .catch((msg, code) => res.status(code).send(msg));
});



module.exports = router;