module.exports = res =>
{
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/json');
    res.end('{"status":200}');
};