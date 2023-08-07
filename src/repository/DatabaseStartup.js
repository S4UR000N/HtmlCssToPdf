module.exports = async () =>
{
    require('dotenv').config();
    const { DynamoDBClient, CreateTableCommand, ListTablesCommand } = require("@aws-sdk/client-dynamodb");
    const { DynamoDBDocumentClient } = require('@aws-sdk/lib-dynamodb');


    const dynamoClient = new DynamoDBClient({
        region: process.env.AWS_REGION,
        endpoint: `http://dynamodb:${process.env.AWS_PORT}`,
        // credentials: { accessKeyId: 'your-access-key', secretAccessKey: 'your-secret-key' }
    });

    const dynamoDocClient = DynamoDBDocumentClient.from(dynamoClient);

    (async function constructor()
    {
        CreateFilesTableCommand(require('./DatabaseDefinition'));
        ListDatabaseTablesCommand();
    })();

    async function CreateFilesTableCommand(tableDefinition)
    {
        try
        {
            const command = new CreateTableCommand(tableDefinition.FilesTable);
            const response = await dynamoClient.send(command);
            console.log("Table created successfuly", response);
        }
        catch (err)
        {
            if (err.name === 'ResourceInUseException')
            {
                console.log("Table Aleready Exists");
            }
            else
            {
                console.error("db error print: ", err);
            }
        }
    }

    async function ListDatabaseTablesCommand()
    {
        const command = new ListTablesCommand({});
        try
        {
            const response = await dynamoClient.send(command);
            console.log("list tables response: ", response.TableNames);
        }
        catch (err)
        {
            console.log("ERRROR IN LIST????");
            console.error(err);
        }
    }

    return { dynamoClient, dynamoDocClient };
}
