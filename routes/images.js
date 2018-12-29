var express = require('express');
var router = express.Router();

'use strict';
const {Docker} = require('node-docker-api');

const docker = new Docker({socketPath: '/var/run/docker.sock'});

router.get('/', (req, res) => {
    let resImages = [];
    docker.image.list().then(images => {
        for (const key in images) {
            resImages.push(images[key].data);
        }
        res.json(resImages);
    })
});

module.exports = router;