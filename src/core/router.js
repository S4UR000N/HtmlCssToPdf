const routes = require('./routes');
const invoker = require('./invoker');
const httpMethod = require('./http_methods');

module.exports = async (req, res) =>
{
    for (route in routes)
    {
        if (req.url === route && req.method === routes[route].method)
        {
            return req.method === httpMethod.GET
            ? invoker(routes[route].handler, res)
            : invoker(routes[route].handler, res, req)

        }
    }
    return invoker('404', res);
}
