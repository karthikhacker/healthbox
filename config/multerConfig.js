const multer = require('multer');
const multerS3 = require('multer-s3');
const s3 = require('./awsConfig');

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.BUCKET_NAME,
        acl: 'private',
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
            cb(null, `files-${Date.now()}.pdf`)
        }
    })
})

module.exports = upload;