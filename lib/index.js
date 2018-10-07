"use strict";
/*
* Primary File For the API
*/
exports.__esModule = true;
// Node Lib
var http = require("http");
var https = require("https");
var fs = require("fs");
var path = require("path");
// App Files
var config_1 = require("./config");
var server_1 = require("./server");
// Create Http Server
var httpServer = http.createServer(function (req, res) {
    server_1["default"](req, res);
});
httpServer.listen(config_1["default"].httpPort, function () {
    console.log("The Server is listening on port " + config_1["default"].httpPort + " in " + config_1["default"].envName);
});
var httpsServerOptions = {
    'key': fs.readFileSync(path.join(__dirname, '/../https/key.pem')),
    'cert': fs.readFileSync(path.join(__dirname, '/../https/cert.pem'))
};
var httpsServer = https.createServer(httpsServerOptions, function (req, res) {
    server_1["default"](req, res);
});
httpsServer.listen(config_1["default"].httpsPort, function () {
    console.log("The Server is listening on port " + config_1["default"].httpsPort + " in " + config_1["default"].envName);
});
//# sourceMappingURL=index.js.map