const AWS = require('aws-sdk');

AWS.config.update({
    region: 'us-west-1',
    endpoint: 'http://localhost:8000'
});

// Uncomment above config and uncomment following in order to create DynamoDb table in web/cloud
// AWS.config.update({
//     region: 'eu-west-1'
// });
// // Setup aws credentials in the .aws folder using aws configure
// const credentials = new AWS.SharedIniFileCredentials({
//     profile: 'profileName'
// });
// AWS.config.credentials = credentials;

ddb = new AWS.DynamoDB({ apiVersion: '2012-10-08' });

var params = {
    TableName: process.argv[2]
};

// Call DynamoDB to delete the specified table
ddb.deleteTable(params, (err, data) => {
    if (err && err.code === 'ResourceNotFoundException') {
        console.log('Error: Table not found');
    } else if (err && err.code === 'ResourceInUseException') {
        console.log('Error: Table in use');
    } else {
        console.log('Success', data);
    }
});
