require('dotenv').config({path: './.env.development.local'})
const express = require('express')
    , cors = require('cors')
    , bodyParser = require('body-parser')
    , app = express()
    , s3 = require('./S3.js')

app.use(cors())
app.use(bodyParser.json({limit:'10mb'}))

app.post('/api/photoUpload', s3.uploadPhoto)


app.listen(3001, _=>{console.log('(I)...(I)')})



