var util = require('util');
var amazon = require("amazon");
var sqs = require("sqs");

var env = process.env;
var accessKeyId = process.env.ACCESS_KEY_ID;
var secretAccessKey = process.env.SECRET_ACCESS_KEY;
var awsAccountId = process.env.AWS_ACCOUNT_ID;

var sqs = new sqs.Sqs(accessKeyId, secretAccessKey, awsAccountId, amazon.US_EAST_1);

console.log( 'Region :', sqs.region() );
console.log( 'EndPoint :',  sqs.endPoint() );
console.log( 'AccessKeyId :', sqs.accessKeyId() );
console.log( 'SecretAccessKey :', sqs.secretAccessKey() );
console.log( 'AwsAccountId :', sqs.awsAccountId() );

var options = {
    queueName : 'my-queue'
};

options.attribute = 'All';
sqs.getQueueAttributes(options, function(err, data) {
    console.log("\nGetting all attributes for my-queue - expecting success");
    console.log('Error :', util.inspect(err, true, null));
    console.log('Data :', util.inspect(data, true, null));
});

options.attribute = { 'ApproximateNumberOfMessages' : true, 'MessageRetentionPeriod' : true };
sqs.getQueueAttributes(options, function(err, data) {
    console.log("\nGetting 2 attrs (using an object) for my-queue - expecting success");
    console.log('Error :', util.inspect(err, true, null));
    console.log('Data :', util.inspect(data, true, null));
});

options.attribute = [ 'ApproximateNumberOfMessages', 'MessageRetentionPeriod', 'DelaySeconds' ];
sqs.getQueueAttributes(options, function(err, data) {
    console.log("\nGetting 2 attrs (using an array) for my-queue - expecting success");
    console.log('Error :', util.inspect(err, true, null));
    console.log('Data :', util.inspect(data, true, null));
});