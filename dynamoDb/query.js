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

const ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });

var params = {
    ExpressionAttributeValues: {
        ':n': { S: 'Amma Zon' }
        //, ':s': { N: '129' }
    },
    KeyConditionExpression: 'UserName = :n', //and OrderId = :s',
    // ProjectionExpression: 'Episode, Title, Subtitle',
    // FilterExpression: 'contains (Subtitle, :topic)',
    TableName: 'UserOrders'
};

ddb.query(params, function(err, data) {
    if (err) {
        console.log('Error', err);
    } else {
        //console.log("Success", data.Items);
        data.Items.forEach(function(element, index, array) {
            console.log(element);
        });
    }
});
