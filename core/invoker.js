module.exports = (handler, res, req) => req === "undefined" ? require('./../handlers/'+handler)(res) : require('./../handlers/'+handler)(res, req);