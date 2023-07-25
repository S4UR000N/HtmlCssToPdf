const httpMethod = require('./http_methods');

module.exports =
{
    '/': {
        method: httpMethod.GET,
        handler: 'root'
    },
    '/convert':
    {
        method: httpMethod.POST,
        handler: 'convert'
    },
};