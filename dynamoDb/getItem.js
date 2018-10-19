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

var ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });

var params = {
    TableName: 'UserOrders',
    Key: {
        UserName: { S: 'Amma Zon' },
        OrderId: { N: '1' }
    } //,
    //ProjectionExpression: 'ATTRIBUTE_NAME'
};

ddb.getItem(params, function(err, data) {
    if (err) {
        console.log('Error', err);
    } else {
        console.log('Success', data.Item);
    }
});
