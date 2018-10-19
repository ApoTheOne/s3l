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
        UserOrders: [
            {
                PutRequest: {
                    Item: {
                        UserName: { S: 'Flip' },
                        OrderId: { N: '1' } //,
                        //IsActive: { BOOL: true },
                        //TimeStamp: { S: '10-09-2018 12:00:00' }
                    }
                }
            } //,
            // {
            //     PutRequest: {
            //         Item: {
            //             UserName: { S: 'Amma Zon' },
            //             OrderId: { N: '3' },
            //             IsActive: { BOOL: true },
            //             TimeStamp: { S: '10-09-2018 12:00:00' }
            //         }
            //     }
            // },
            // {
            //     PutRequest: {
            //         Item: {
            //             UserName: { S: 'Flippy Cart' },
            //             OrderId: { N: '1' },
            //             IsActive: { BOOL: true },
            //             TimeStamp: { S: '10-09-2018 12:00:00' }
            //         }
            //     }
            // }
            // {
            //     DeleteRequest: {
            //         Key: { HashKey: '1' }
            //     }
            // },
            // {
            //     PutRequest: {
            //         Item: {
            //             HashKey: 'Amma Zon',
            //             NumAttribute: 1,
            //             BoolAttribute: true,
            //             ListAttribute: [1, 'two', false],
            //             MapAttribute: { foo: 'bar' }
            //         }
            //     }
            // }
        ]
    }
};

documentClient.batchWrite(params, (err, data) => {
    if (err) console.log('Error: ', err);
    else console.log(data);
});
