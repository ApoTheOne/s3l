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
                { UserName: { N: 'Amma Zon' }, OrderId: '1' },
                { UserName: { N: 'Amma Zon' }, OrderId: '2' },
                { UserName: { N: 'Amma Zon' }, OrderId: '3' }
            ] //,
            //ProjectionExpression: 'KEY_NAME, ATTRIBUTE'
        }
    }
};

documentClient.batchGet(params, (err, data) => {
    if (err) console.log(err);
    else console.log(data);
});

// var params = {
//     RequestItems: {
//         'UserOrders': {
//             Keys: [
//                 {
//                     HashKey: 'haskey',
//                     NumberRangeKey: 1
//                 }
//             ]
//         },
//         'Table-2': {
//             Keys: [{ foo: 'bar' }]
//         }
//     }
// };
