module.exports = async () =>
{
    const { dynamoClient, dynamoDocClient, s3Client } = await require("./DatabaseStartup")();
    
    return { dynamoClient, dynamoDocClient, s3Client };
}
