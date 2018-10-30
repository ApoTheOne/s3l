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

var dynamodb = new AWS.DynamoDB();

var params = {
    TableName: 'UserOrders'
};

dynamodb.deleteTable(params, function(err, data) {
    if (err) {
        console.error(
            'Unable to delete table. Error JSON:',
            JSON.stringify(err, null, 2)
        );
    } else {
        console.log(
            'Deleted table. Table description JSON:',
            JSON.stringify(data, null, 2)
        );
    }
});
