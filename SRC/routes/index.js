// src/routes/index.js
const router = require('express').Router();
const mongoose = require('mongoose');

const FILES = [
  {id: '1', name: 'Sleeping Baby', Description: 'Vanilla cake with decorative icing'},
  {id: '2', name: 'Ladybug Character', Description: 'Red velvet cake with decorative icing'},
  {id: '3', name: 'Elmo', Description: 'Yellow cake with decorative icing'},
  {id: '4', name: 'Minnie Mouse', Description: 'Dark Chocolate cake with decorative icing'},
  {id: '5', name: 'Monkey', Description: 'White cake with decorative icing'},
  {id: '6', name: 'Peacock', Description: 'Multi-colored cake with decorative icing'},
  {id: '7', name: 'Poop Emoji', Description: 'Chocolate cake with decorative icing'},
  {id: '8', name: 'Chanel Purse', Description: 'White Chocolate cake with decorative icing'},
  {id: '9', name: 'Panda', Description: 'Marble cake with decorative icing'},
  {id: '10', name: 'Santa', Description: 'White mint chocolate cake with decorative icing'},
];


router.use('/doc', function(req, res, next) {
  res.end(`Documentation http://expressjs.com/`);
});

router.get('/file', function(req, res, next) {
  mongoose.model('File').find({}, function(err, files) {
    if (err) {
      console.log(err);
      res.status(500).json(err);
    }

  res.json(FILES);
});
});


router.post('/file', function(req, res, next) {
  const newId = '' + FILES.length;
  const data = req.body;
  data.id = newId;

  FILES.push(data);
  res.status(201).json(data);
});
router.put('/file/:fileId', function(req, res, next) {
  const {fileId} = req.params;
  const file = FILES.find(entry => entry.id === fileId);
  if (!file) {
    return res.status(404).end(`Could not find file '${fileId}'`);
  }

  file.id = req.body.id;
  file.description = req.body.description;
  res.json(file);
});

router.delete('/file/:fileId', function(req, res, next) {
  res.end(`Deleting file '${req.params.fileId}'`);
});

router.get('/file/:fileId', function(req, res, next) {
  const {fileId} = req.params;
  // same as 'const fileId = req.params.fileId'

  const file = FILES.find(entry => entry.id === fileId);
  if (!file) {
    return res.status(404).end(`Could not find file '${fileId}'`);
  }

  res.json(file);
});

module.exports = router;

