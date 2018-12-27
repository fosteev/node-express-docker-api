const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Web server run')
});

module.exports = router;