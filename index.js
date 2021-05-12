var http = require('http');
const bl = require('./bl');//import business layer
const appConfig = require('./config').appConfig;//import app config file

http.createServer(async function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/json'});
    let resp = await bl.prepareData();
    res.end(resp);
}).listen(appConfig.port);


