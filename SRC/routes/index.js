// src/routes/index.js
const router = require('express').Router();
const mongoose = require('mongoose');




router.use('/doc', function(req, res, next) {
  res.end(`Documentation http://expressjs.com/`);
});

/**
 * Displays a list of all files in the database
 */
router.get('/file', function(req, res, next) {
  const fileModel = mongoose.model('File');

  fileModel.find({}, function(err, files) {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  
    res.json(files);
  });
});

/**
 * 'Get' a single file by passing its fileId as a URL param
 */
router.get('/file/:fileId', function(req, res, next) {
  const {fileId} = req.params;
  // same as 'const fileId = req.params.fileId'

  const file = FILES.find(entry => entry.id === fileId);
  if (!file) {
    return res.status(404).end(`Could not find file '${fileId}'`);
  };

  res.json(file);
});

/**
 * New file created
 */
router.post('/file', function(req, res, next) {
  const File = mongoose.model('File');
  const fileData = {
    title: req.body.title,
    description: req.body.description,
  };

  File.create(fileData, function(err, newFile) {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }

    res.json(newFile);
  });
});

/**
 * Existing files updated 
 */
router.put('/file/:fileId', function(req, res, next) {
  const File = mongoose.model('File');
  const fileId = req.params.fileId;

  File.findById(fileId, function(err, file) {
    if (err) {
      console.error(err);
      return res.status(500).json(err);
    }
    if (!file) {
      return res.status(404).json({message: "File not found"});
    }

    file.title = req.body.title;
    file.description = req.body.description;

    file.save(function(err, savedFile) {
      if (err) {
        console.error(err);
        return res.status(500).json(err);
      }
      res.json(savedFile);
    })

  })

});

/**
 * Delete a file
 */
router.delete('/file/:fileId', function(req, res, next) {
  const File = mongoose.model('File');
  const fileId = req.params.fileId;
  
  File.remove({_id:fileId}, function(err) {
    res.json("delete file")
  });

});


module.exports = router;
