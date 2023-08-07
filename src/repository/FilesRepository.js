module.exports = async () =>
{
    const { dynamoClient, dynamoDocClient } = await require("./BaseRepository")();
    const { ScanCommand, QueryCommand, PutCommand  } = require('@aws-sdk/lib-dynamodb');
    const uuid = require('uuid');


    console.log("WE ARE IN FILE REPOSITORY");
    const createFileMetadata = new PutCommand({
        TableName: "FILES",
        Item: {
          FILE_ID: uuid.v4(),
          Name: "FileName",
          S3StorageID: "asd123123asdsad1231",
          S3StoragePath: "/asdasd/asdadas/asdadasd.pdf"
        },
      });
    
      const response = await dynamoDocClient.send(createFileMetadata);
      console.log("inserted file");
      console.log(response);

      const scanParams = {
        TableName: "FILES",
      };
      
      const scanCommand = new ScanCommand(scanParams);
      
      dynamoDocClient.send(scanCommand)
        .then((data) => {
          // data.Items will contain an array of all items in the "FILES" table
          console.log("Items in the FILES table:", data.Items);
        })
        .catch((error) => {
          console.error("Error querying the FILES table:", error);
        });

    // const command = new QueryCommand({
    //     TableName: "FILES",
    //     KeyConditionExpression:
    //     "OriginCountry = :originCountry AND RoastDate > :roastDate",
    //     ExpressionAttributeValues: {
    //     ":originCountry": "Ethiopia",
    //     ":roastDate": "2023-05-01",
    //     },
    //     ConsistentRead: true,
    // });
}
