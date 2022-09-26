var express = require('express')
var AWS = require('aws-sdk')

var app = express();
var accessKeyId =  process.env.AWS_ACCESS_KEY || "ASIAIOSFODNN7EXAMPLE";
var secretAccessKey = process.env.AWS_SECRET_KEY || "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY";

AWS.config.update({
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey
});
var s3 = new AWS.S3();  

uploadFile = (req, res) => {
    const file = req.file;
    console.log("file >>>> ", file)
    var params = {
        Bucket: 'testbucket',
        Key: file.filename,
        Body: file.path
    };
    s3.putObject(params, function (error, response) {
        console.log("error, response >>>>", error, response)
        if (error) {
        console.log("Error uploading data: ", error);
        } else {
        console.log("Successfully uploaded data to myBucket/myKey");
        }
    });
}

module.exports = uploadFile;
