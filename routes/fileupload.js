const express = require('express');
const { getS3Images, uploadS3Image } = require('../utill/s3Client');
const router = express.Router()

// Upload a file
router.route("/s3images").get(getS3Images);

router.post('/upload', uploadS3Image.array('file', 3), (req, res) => {
  if (!req.files) res.status(400).json({ error: 'No files were uploaded.' })

  res.status(201).json({
    message: 'Successfully uploaded ' + req.files.length + ' files!',
    files: req.files
  })
})



module.exports = router
