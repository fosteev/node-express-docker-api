var express = require('express');
var router = express.Router();

'use strict';
const {Docker} = require('node-docker-api');

const docker = new Docker({socketPath: '/var/run/docker.sock'});

router.get('/', (req, res) => {
    let resContainers = [];
    docker.container.list().then(containers => {
        for (const key in containers) {
            resContainers.push(containers[key].data);
        }
        res.json(resContainers);
    })
});

router.post('/create', (req, res) => {
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
})

router.post('/', (req, res) => {
    setTimeout(() => {
        res.status(404);
        res.send('dasdad');
    }, 4000);
})

module.exports = router;