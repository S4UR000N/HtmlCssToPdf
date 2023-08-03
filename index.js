// require('dotenv').config();
// require('node:http').createServer(require('./src/core/router'))
// .listen(process.env.PROD_PORT, process.env.HOST_NAME,
//     /*                                          ${process.env.HOST_NAME}*/
//     () => console.log(`Server running at http://127.0.0.1:${process.env.PROD_PORT}/`));

const http = require('node:http');

const hostname = '0.0.0.0';
const port = 3000;

const server = http.createServer((req, res) => {
    require('dotenv').config();
    const { DynamoDBClient, ListTablesCommand } = require("@aws-sdk/client-dynamodb");

    (async function () {
        const dbClient = new DynamoDBClient({
            region: process.env.AWS_REGION, // Replace with your desired AWS region
            endpoint: `http://dynamodb:8000`, // Replace with the endpoint URL of your local DynamoDB instance (DynamoDB Local)
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


    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello, World!\n');
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});