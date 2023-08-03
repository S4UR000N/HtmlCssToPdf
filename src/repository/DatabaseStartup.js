module.exports = async () =>
{
    require('dotenv').config();
    const { DynamoDBClient, ListTablesCommand } = require("@aws-sdk/client-dynamodb");

    (async function() {
    const dbClient = new DynamoDBClient({
        region: process.env.AWS_REGION, // Replace with your desired AWS region
        endpoint: `http:///dynamodb:${process.env.AWS_PORT}`, // Replace with the endpoint URL of your local DynamoDB instance (DynamoDB Local)
        // Optionally, you can also set credentials here:
        // credentials: { accessKeyId: 'your-access-key', secretAccessKey: 'your-secret-key' }
    });
    // const dbClient = new DynamoDBClient({ region: 'us-west-2' });
    const command = new ListTablesCommand({});
    
    try {
        const results = await dbClient.send(command);
        console.log("success?");
        console.log(results.TableNames.join('\n'));
    } catch (err) {
        console.log("fail!");
        console.error(err);
        console.log(JSON.stringify(err.$response));
    }
      })();


    // const DynamoDbClient = require('@aws-sdk/client-dynamodb').DynamoDBClient;
    // const region = process.env.AWS_REGION;
    // var ddb = DynamoDbClient.builder()
    //   .region(region)
    //   .
    //   .credentialsProvider(EnvironmentVariableCredentialsProvider.create())
    //   .build();




    // const { DynamoDBClient, ListTablesCommand } = require('@aws-sdk/client-dynamodb');
    // const { fromEnv } = require('@aws-sdk/credential-provider-env');

    // // Set the AWS region
    // const region = process.env.AWS_REGION;
    
    // // Load AWS credentials from environment variables
    // // const credentials = fromEnv();

    // // Load AWS credentials from environment variables using fromEnv
    // const config = {
    //     'region': 'eu-west-1',
    //     'credentials': {
    //       'accessKeyId': 'xxxxxxxxxxxxx',
    //       'secretAccessKey': 'xxxxxxxxxxxxxxxxxxxxxx'
    //     },
    //     'endpoint': 'localhost:8000'
    //   };




    // // Create a new instance of DynamoDBClient with the specified credentials and region
    // const dynamoDBClient = new DynamoDBClient({config});
    
    // // Create the ListTablesCommand to list DynamoDB tables with a limit of 10
    // const listTablesCommand = new ListTablesCommand({ Limit: 10 });
    
    // // Use the DynamoDBClient to send the command and handle the response
    // dynamoDBClient.send(listTablesCommand)
    //   .then((data) => {
    //     console.log("Table names are ", data.TableNames);
    //   })
    //   .catch((err) => {
    //     console.error("Error", err);//err.code);
    //   });


    // require('dotenv').config();
    // const DynamoDBClient = require('@aws-sdk/client-dynamodb').DynamoDBClient;
    // const client = new DynamoDBClient({ region: process.env.AWS_REGION });
    
    // client.listTables({}, (err, data) => {
    //     if (err) console.log(err, err.stack);
    //     else console.log(data);
    // });
    
    // ddb.listTables({Limit: 10}, function(err, data) {
    //     if (err) {
    //       console.log("Error", err.code);
    //     } else {
    //       console.log("Table names are ", data.TableNames);
    //     }
    //   });

    // ddb.createTable(require('./DatabaseDefinition'), function(err, data) {
    //     if (err) {
    //       console.log("Error", err);
    //     } else {
    //       console.log("Table Created", data);
    //     }
    // });
}