require('dotenv').config();
require('node:http').createServer(require('./core/router'))
.listen(process.env.PROD_PORT, process.env.HOST_NAME,
    /*                                          ${process.env.HOST_NAME}*/
    () => console.log(`Server running at http://127.0.0.1:${process.env.PROD_PORT}/`));