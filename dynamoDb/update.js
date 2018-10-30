var AWS = require('aws-sdk');

AWS.config.update({
    region: 'us-west-1',
    endpoint: 'http://localhost:8000'
});

var docClient = new AWS.DynamoDB.DocumentClient();

var table = 'UserOrders';

var OrderId = 1;
var UserName = 'Amma Zon';
const dateTime = new Date(2018, 10, 08);

var params = {
    TableName: table,
    Key: {
        OrderId: OrderId,
        UserName: UserName
    },
    ExpressionAttributeNames: { '#p': 'TimeStamp' },
    UpdateExpression: 'set IsActive = :p, #p = :date',
    ConditionExpression: 'IsActive = :np',
    ExpressionAttributeValues: {
        ':p': false,
        ':np': true,
        ':date': dateTime.toString()
    },
    ReturnValues: 'UPDATED_NEW',
    ReturnConsumedCapacity: 'INDEXES',
    ReturnValues: 'UPDATED_OLD'
};

console.log('Attempting a conditional update...');
docClient.update(params, function(err, data) {
    if (err) {
        console.error(
            'Unable to update user. Error JSON:',
            JSON.stringify(err, null, 2)
        );
    } else {
        console.log('UpdateItem succeeded:', JSON.stringify(data, null, 2));
    }
});
