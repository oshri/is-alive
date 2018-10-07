"use strict";
exports.__esModule = true;
var url = require("url");
var stringDecoder = require("string_decoder");
var router_1 = require("./router");
var JsonFile_1 = require("./utils/JsonFile");
var StringDecoder = stringDecoder.StringDecoder;
var _jsonFile = new JsonFile_1.JsonFile();
var handleServer = function (req, res) {
    // Handle Path & Query String
    var parsedUrl = url.parse(req.url, true);
    var path = parsedUrl.pathname;
    var trimmedPath = path.replace(/^\/+|\/+$/g, '');
    // Get Query string as an Object
    var queryStringObject = parsedUrl.query;
    // Get Req Method
    var method = req.method.toLocaleLowerCase();
    // Get Req Headers
    var headers = req.headers;
    // Get Payload Stream
    var decoder = new StringDecoder('utf-8');
    var buffer = '';
    req.on('data', function (data) {
        buffer += decoder.write(data);
    });
    req.on('end', function () {
        buffer += decoder.end();
        // Constrat the Data Object From Req
        var data = {
            path: trimmedPath,
            query: queryStringObject,
            method: method,
            headers: headers,
            payload: buffer
        };
        // Choose the right handler request
        var chosenRouterHandler = typeof router_1.router[trimmedPath] !== 'undefined'
            ? router_1.router[trimmedPath]
            : router_1.handlers.notFound;
        chosenRouterHandler(data, function (statusCode, payload) {
            // Handle empty status code as 200 OK
            statusCode = typeof statusCode === 'number' ? statusCode : 200;
            // Handle empty payload
            payload = typeof payload === 'object' ? payload : {};
            // Convert payload Object into a string
            var payloadString = JSON.stringify(payload);
            // Return The Response
            res.setHeader('Content-Type', 'application/json');
            res.writeHead(statusCode);
            res.end(payloadString);
            // _jsonFile.create('users', 'newFile', {'foo': 'bar'}, (err) => {
            // 	console.log('This was the message', err);
            // });
            // _jsonFile.reade('users', 'newFile', (err, data) => {
            // 	console.log('This was the message', err, data);
            // });
            // _jsonFile.update('users', 'newFile', {'name': 'oshri'}, (err) => {
            // 	console.log('This was the message', err);
            // });
            _jsonFile["delete"]('users', 'newFile', function (err) {
                console.log('This was the message', err);
            });
            console.log('Returning this response:', statusCode, payloadString);
        });
    });
};
exports["default"] = handleServer;
//# sourceMappingURL=server.js.map