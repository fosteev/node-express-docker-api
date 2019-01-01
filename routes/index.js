const express = require('express');
const os = require('os');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({
        EOL: os.EOL,
        platform: os.platform(),
        release: os.release(),
        upTime: os.uptime(),
        memory: (os.totalmem() / 10024 / 1024).toFixed(2),
        homedir: os.homedir()
})
});

module.exports = router;