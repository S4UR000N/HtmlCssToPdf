const routes = require('./routes');
const invoker = require('./invoker');

module.exports = (req, res) =>
{
    for (route in routes)
    {
        if (req.url === route && req.method === routes[route].method)
        {
            return invoker(routes[route].handler, res);
        }
    }
    return invoker('404', res);
};
