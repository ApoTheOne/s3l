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
                        UserName: 'Flip',
                        OrderId: 1,
                        IsActive: true,
                        TimeStamp: '10-09-2018 12:00:00'
                    }
                }
            },
            {
                PutRequest: {
                    Item: {
                        UserName: 'Amma Zon',
                        OrderId: 3,
                        IsActive: true,
                        TimeStamp: '10-09-2018 12:00:00'
                    }
                }
            },
            {
                PutRequest: {
                    Item: {
                        UserName: 'Cart',
                        OrderId: 1,
                        IsActive: true,
                        TimeStamp: '10-09-2018 12:00:00'
                    }
                }
            } //,
            // {
            //     DeleteRequest: {
            //         Key: { UserName: 'Amma Zon' }
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
    else console.log(JSON.stringify(data));
});
