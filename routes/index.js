const express = require('express');
const os = require('os');
const router = express.Router();

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

module.exports = router;