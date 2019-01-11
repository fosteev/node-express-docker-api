var express = require('express');
var router = express.Router();

'use strict';
const {Docker: Index} = require('node-docker-api');

const docker = new Index({ socketPath: '/var/run/docker.sock' });

router.get('/containers', (req, res) => {
    // List
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
    const {id, image, container_port, exposed_port, name} = req.query;
    const exposedPorts = {};

    if (!(container_port && exposed_port && image, name)) {
        res.status(403).send('Not have params');
    }

    const hostContainerPort = `${container_port}/tcp`;

    exposedPorts[hostContainerPort] = [{
        "HostPort": exposed_port.toString(),
        "HostIp": "0"
    }]

    const params = {
        Image: image,
        name: name,
        ExposedPorts: {},
        HostPort: {
            PortBindings: exposedPorts
        }
    };

    params.ExposedPorts[hostContainerPort] = {};

    docker.container.create(params)
        .then(container => container.start())
        .then(container => res.json(container.data))
        .catch(error => {
            const {json, statusCode} = error;
            res.status(statusCode ? statusCode : 500).send(json)
        });
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