var express = require('express');
var router = express.Router();

'use strict';
const {Docker} = require('node-docker-api');

const docker = new Docker({ socketPath: '/var/run/docker.sock' });

router.get('/', (req, res) => {
    // List
    // docker.container.list()
    // // Inspect
    //     .then(containers => containers[0].status())
    //     .then(container => container.top())
    //     .then(processes => console.log(processes))
    //     .catch(error => console.log(error));
    let resImages = [];
    docker.image.list()
    // Inspect
        .then(images => {
            for (const key in images) {
                resImages.push(images[key].data);
            }
            res.json(resImages);
        })
});

module.exports = router;