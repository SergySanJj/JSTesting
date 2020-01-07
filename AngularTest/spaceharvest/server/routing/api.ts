export {};

const distFolder = require('../constants').distFolder;

const path = require('path');
const fs = require('fs');
const router = require('express').Router();

router.get('/', (req, res) => {
  res.sendFile(path.join(distFolder, '/index.html'));
});

router.get('/login', (req, res) => {
  res.sendFile(path.join(distFolder, '/index.html'));
});

router.get('/play', (req, res) => {
  res.sendFile(path.join(distFolder, '/index.html'));
});

// DOM files requests
router.get('/*.(css|js|ico|html)', (req, res) => {
  const p = path.join(distFolder, req.url);
  if (fs.existsSync(p)) {
    res.sendFile(p);
  } else {
    res.status(404)        // HTTP status 404: NotFound
      .send(req.url + ' Not found');
  }
});


// Wildcard route has to be last
router.get('/*', (req, res) => {
    res.sendFile(path.join(distFolder, '/index.html'));
  }
);
module.exports = router;
