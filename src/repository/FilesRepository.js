module.exports = async () =>
{
    const { dynamoClient, dynamoDocClient, s3Client } = await require("./BaseRepository")();
    const { ScanCommand, QueryCommand, PutCommand, DeleteCommand } = require('@aws-sdk/lib-dynamodb');
    const { PutObjectCommand } = require('@aws-sdk/client-s3');
    const uuid = require('uuid');

    /** Methods Start */
    async function SavePdfFile(pdfFileBuffer)
    {
      const uuidv4 = uuid.v4()
      let isMetadataSaved = await CreateDynamoFileMetadata(uuidv4);
      if (isMetadataSaved)
      {
        let isPdfFileSaved = await CreateS3FileObject(uuidv4, pdfFileBuffer)
        if (isPdfFileSaved)
        {
          return true;
        }
        await DeleteDynamoFileMetadata(uuidv4);
      }
      return false;
    }
    /** Methods End */

    /** DynamoDB Methods Start */
    async function CreateDynamoFileMetadata(uuid)
    {
      console.log("Create Dynamo File Metadata");
      const createFileMetadata = new PutCommand({
        TableName: "FILES",
        Item: {
          FILE_ID: uuid,
          Bucket: "files",
        },
      });
      
      try
      {
        const response = await dynamoDocClient.send(createFileMetadata);
        console.log("inserted file");
        console.log(response);
        return true;
      }
      catch (err)
      {
        return false;
      }

    }
    async function DeleteDynamoFileMetadata(uuid)
    {
      try
      {
        const deleteFileMetadata = new DeleteCommand({
          TableName: "FILES",
          Key: uuid,
        });
        await dynamoDocClient.send(deleteFileMetadata);
      } catch {}
    }
    /* DynamoDB Methods End **/

    /** S3 Methods Start */
    async function CreateS3FileObject(uuid, pdfFileBuffer)
    {
      const command = new PutObjectCommand({
        Bucket: 'files',
        Key: `${uuid}.pdf`,
        Body: pdfFileBuffer,
        ContentType: 'application/pdf'
      });
    
      try
      {
        const response = await s3Client.send(command);
        console.log(response);
        return true;
      }
      catch (err)
      {
        console.error(err);
        return false;
      }
    }
    /* S3 Methods End **/

    return { SavePdfFile };
}



// async function ReadFiles()
// {
//   const scanParams = { TableName: "FILES" };

//   const scanCommand = new ScanCommand(scanParams);
    
//   dynamoDocClient.send(scanCommand)
//   .then((data) =>
//   {
//     // data.Items will contain an array of all items in the "FILES" table
//     console.log("Items in the FILES table:", data.Items);
//   })
//   .catch((error) =>
//   {
//     console.error("Error querying the FILES table:", error);
//   });
// }

// const command = new QueryCommand({
//   TableName: "FILES",
//   KeyConditionExpression:
//   "OriginCountry = :originCountry AND RoastDate > :roastDate",
//   ExpressionAttributeValues: {
//   ":originCountry": "Ethiopia",
//   ":roastDate": "2023-05-01",
//   },
//   ConsistentRead: true,
// });