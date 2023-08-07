module.exports = async () =>
{
    const { dynamoClient, dynamoDocClient } = await require("./DatabaseStartup")();
    
    return { dynamoClient, dynamoDocClient };
}
