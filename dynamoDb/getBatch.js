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

var documentClient = new AWS.DynamoDB.DocumentClient();

var params = {
    RequestItems: {
        UserOrders: {
            Keys: [
                { UserName: 'Amma Zon', OrderId: 1 },
                { UserName: 'Flip', OrderId: 1 },
                { UserName: 'Amma Zon', OrderId: 3 },
                { UserName: 'Cart', OrderId: 1 }
            ],
            ExpressionAttributeNames: { '#ts': 'TimeStamp' },
            ProjectionExpression: 'UserName, OrderId, IsActive, #ts'
        }
    }
};

documentClient.batchGet(params, (err, data) => {
    if (err) console.log(err);
    else console.log(JSON.stringify(data));
});
