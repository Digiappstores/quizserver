const aws = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3')

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  bucket: process.env.AWS_S3_BUCKET
})


const uploadS3Image = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_S3_BUCKET,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: 'public-read',
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname })
    },
    key: (req, file, cb) => {
      cb(null, 'files_from_node/' + Date.now().toString() + "_" + file.originalname)
    }
  })
})


const getS3Images = (req, res) => {
  var params = {
    Bucket: process.env.AWS_S3_BUCKET,
  };
  s3.listObjects(params, function (err, data) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      var localArr = data.Contents.map((option) => ({ fileName: `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_DEFAULT_REGION}.amazonaws.com/${option.Key}`, size: option.Size, lastModified: option.LastModified }))
      var pdata = { bucketName: data.Name, data: localArr }
      res.json({ data: pdata, status: "success" });
    }
  });
}

module.exports = {
  uploadS3Image,
  getS3Images
}
