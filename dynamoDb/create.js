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

var ddb = new AWS.DynamoDB();

var params = {
    TableName: 'UserOrders',
    KeySchema: [
        {
            AttributeName: 'UserName',
            KeyType: 'HASH'
        },
        {
            AttributeName: 'OrderId',
            KeyType: 'RANGE'
        }
    ],
    AttributeDefinitions: [
        {
            AttributeName: 'UserName',
            AttributeType: 'S'
        },
        {
            AttributeName: 'OrderId',
            AttributeType: 'N'
        }
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 1,
        WriteCapacityUnits: 1
    },
    StreamSpecification: {
        StreamEnabled: false
    }
};

// Call DynamoDB to create the table
ddb.createTable(params, (err, data) => {
    if (err) {
        console.log('Error', err);
    } else {
        console.log('Success', data);
    }
});
