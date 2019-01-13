const express = require('express');
const os = require('os');
const router = express.Router();
const Configuration = require('../configuration');

router.get('/', (req, res) => {
    res.json({
        EOL: os.EOL,
        platform: os.platform(),
        release: os.release(),
        arch: os.arch(),
        cpu: os.cpus(),
        upTime: os.uptime(),
        hostname: os.hostname(),
        homedir: os.homedir(),
        network: os.networkInterfaces(),
    })
});

router.get('/config', (req, res) => {
    const configuration = new Configuration();
    res.json({
        headers: configuration.getHedaers(),
        port: configuration.getPort(),
        path: configuration.getPath()
    });
});

module.exports = router;