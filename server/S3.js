require('dotenv').config()

const AWS = require('aws-sdk')

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS,
    secretAccessKey: process.env.AWS_SECRET,
    region: process.env.AWS_REGION
})

const S3 = new AWS.S3()

function uploadPhoto(req, res) {
    console.log('photo in back', req.body.filename, process.env.AWS_ACCESSKEY)
    /*
        req.body = {
            file: (base64 encoded image),
            filename: (whatever the photo is called from the user),
            filetype: (file extension, eg. .png)
        }
    */
    let photo = req.body,
        buf = new Buffer(photo.file.replace(/^data:image\/\w+;base64,/, ""), 'base64'),
        params = {
            Bucket: process.env.AWS_S3_BUCKET,
            Body: buf,
            Key: photo.filename,
            ContentType: photo.filetype,
            ACL: 'public-read'
        }

    console.log(buf)

    S3.upload(params, (err, data) => {
        console.log(err, data)
        err ? res.status(500).send(err) : 
        res.status(200).send(data)
        console.log('S3 response', data)
    })
}

module.exports = function (app) {
    uploadPhoto: uploadPhoto
}