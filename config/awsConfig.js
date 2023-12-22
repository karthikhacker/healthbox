const { S3Client } = require("@aws-sdk/client-s3");

const s3 = new S3Client({
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_KEY,
    region: process.env.REGION_S3
})

module.exports = s3