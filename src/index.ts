/*
* Primary File For the API
*/

// Node Lib
import * as http from 'http';
import * as https from 'https';
import * as fs from 'fs';
import * as path from 'path';

// App Files
import config from './config';
import handleServer from './server';

// Create Http Server
const httpServer = http.createServer((req, res) => {
    handleServer(req, res);
});

httpServer.listen(config.httpPort, () => {
    console.log(`The Server is listening on port ${config.httpPort} in ${config.envName}`);
});

const httpsServerOptions = {
    'key': fs.readFileSync(path.join(__dirname, '/../https/key.pem')),
    'cert': fs.readFileSync(path.join(__dirname, '/../https/cert.pem'))
};

const httpsServer = https.createServer(httpsServerOptions, (req, res) => {
    handleServer(req, res);
});

httpsServer.listen(config.httpsPort, () => {
    console.log(`The Server is listening on port ${config.httpsPort} in ${config.envName}`);
});
