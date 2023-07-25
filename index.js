require('dotenv').config();
require('node:http').createServer(require('./core/router'))
.listen(process.env.prod_port, process.env.host_name,
    () => console.log(`Server running at http://${process.env.host_name}:${process.env.prod_port}/`));