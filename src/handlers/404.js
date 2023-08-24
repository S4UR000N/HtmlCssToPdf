module.exports = async res =>
{
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/html');
    res.end('<h1>404 Not Found</h1>');
}