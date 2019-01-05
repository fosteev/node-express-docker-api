var express = require('express');
var router = express.Router();

'use strict';
const {Docker: Index} = require('node-docker-api');

const docker = new Index({ socketPath: '/var/run/docker.sock' });

router.get('/containers', (req, res) => {
    // List
    // docker.container.list()
    // // Inspect
    //     .then(containers => containers[0].status())
    //     .then(container => container.top())
    //     .then(processes => console.log(processes))
    //     .catch(error => console.log(error));
    let resContainers = [];
    docker.container.list()
    // Inspect
        .then(containers => {
            for (const key in containers) {
                resContainers.push(containers[key].data);
            }
            res.json(resContainers);
        })
});

router.post('/containers', (req, res) => {
    setTimeout(() => {
        res.status(404);
        res.send('dasdad');
    }, 4000);
});

router.get('/images', (req, res) => {

    let resImages = [];
    docker.image.list()
        .then(images => {
            for (const key in images) {
                resImages.push(images[key].data);
            }
            res.json(resImages);
        })
});

module.exports = router;