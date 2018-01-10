require('dotenv').config({path: './.env.development.local'})
const express = require('express')
    , cors = require('cors')
    , bodyParser = require('body-parser')
    , app = express()
    , S3 = require('./S3.js')

app.use(cors())
app.use(bodyParser.json
//Below is an optional line to increase the permitted size of files 
//passing through your server! I had to use this in order to get
//some photos through.
app.use(bodyParser.urlencoded({extended:true, limit:'50mb'}))())

S3(app)

app.listen(3001, _=>{console.log('(I)...(I)')})



