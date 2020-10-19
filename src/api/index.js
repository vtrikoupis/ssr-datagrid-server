const express = require('express');

const emojis = require('./emojis');
const grids = require('./grids')
const users = require('./users')
const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏'
  });
});

router.use('/emojis', emojis);
router.use('/grids', grids)
router.use('/users', users)

module.exports = router;
