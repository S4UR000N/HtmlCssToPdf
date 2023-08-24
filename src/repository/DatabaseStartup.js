module.exports = async () =>
{
    require('dotenv').config();
    const { DynamoDBClient, CreateTableCommand, ListTablesCommand } = require("@aws-sdk/client-dynamodb");
    const { DynamoDBDocumentClient } = require('@aws-sdk/lib-dynamodb');
    const { S3Client, CreateBucketCommand, ListBucketsCommand } = require('@aws-sdk/client-s3');

    const dynamoClient = new DynamoDBClient({
        region: process.env.AWS_REGION,
        endpoint: `http://localstack:${process.env.AWS_PORT}`,
        // credentials: { accessKeyId: 'your-access-key', secretAccessKey: 'your-secret-key' }
    });

    const dynamoDocClient = DynamoDBDocumentClient.from(dynamoClient);

    const s3Client = new S3Client({
        region: process.env.AWS_REGION,
        endpoint: `http://localstack:${process.env.AWS_PORT}`,
        s3ForcePathStyle: true,  // this is for aws
        forcePathStyle: true // this is for localstack
    });

    (async function constructor()
    {
        await CreateFilesTableCommand(require('./DatabaseDefinition'));
        await ListDynamoTablesCommand();
        await CreateFilesBucketCommand();
        await ListS3BucketsCommand();

    })();

    /** DynamoDB Methods Start */
    async function CreateFilesTableCommand(tableDefinition)
    {
        try
        {
            const command = new CreateTableCommand(tableDefinition.FilesTable);
            await dynamoClient.send(command);
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

    async function ListDynamoTablesCommand()
    {
        const command = new ListTablesCommand({});
        try
        {
            const response = await dynamoClient.send(command);
            console.log("list tables response: ", response.TableNames);
        } catch {}
    }
    /* DynamoDB Methods End **/

    /** S3 Methods Start */
    async function CreateFilesBucketCommand()
    {
        const command = new CreateBucketCommand({ Bucket: "files" });
        try
        {
            await s3Client.send(command);
        }
        catch (err)
        {
            console.error(err);
        }
    }

    async function ListS3BucketsCommand()
    {
        const command = new ListBucketsCommand({});
        
        try
        {
            const { Owner, Buckets } = await s3Client.send(command);
            console.log(
            `${Owner.DisplayName} owns ${Buckets.length} bucket${
                Buckets.length === 1 ? "" : "s"
            }:`
            );
            console.log(`${Buckets.map((b) => ` • ${b.Name}`).join("\n")}`);
        }
        catch (err)
        {
            console.error(err);
        }
    }
    /* S3 Methods End */

    return { dynamoClient, dynamoDocClient, s3Client };
}
