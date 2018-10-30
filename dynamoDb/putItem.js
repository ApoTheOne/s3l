// Create the DynamoDB service object
// If run again with updated values then putItem updates that item. Basically it deletes and then inserts new item.
// Note: To prevent new item from replacing existing item, one can use a conditional expression
// for ex: one that contains the attribute_not_exists function with the name of the attribute
// being used as the partition key for the table.
var AWS = require('aws-sdk');

AWS.config.update({
    region: 'us-west-1',
    endpoint: 'http://localhost:8000'
});
// Uncomment above config and uncomment following in order to create DynamoDb table in web/cloud
// AWS.config.update({
//     region: 'eu-west-1'
// });
// const credentials = new AWS.SharedIniFileCredentials({
//     profile: 'profileName'
// });
// AWS.config.credentials = credentials;

var ddb = new AWS.DynamoDB();

var params = {
    TableName: 'UserOrders',
    Item: {
        UserName: { S: 'Amma Zon' },
        OrderId: { N: '1' },
        IsActive: { BOOL: true },
        TimeStamp: { S: '10-09-2018 12:00:00' }
    },
    // ConditionExpression: `ORDERID <> :oid and UserName <> :un`,
    // ExpressionAttributeValues: {
    //     ':oid': { N: orderId },
    //     ':': { N: orderStatus }
    // },
    ReturnValues: 'ALL_OLD',
    ReturnConsumedCapacity: 'INDEXES'
    // ReturnItemCollectionMetrics: 'SIZE'
};

ddb.putItem(params, function(err, data) {
    if (err) {
        console.log('Error', err);
    } else {
        console.log('Success', data);
    }
});
