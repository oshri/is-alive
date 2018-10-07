"use strict";
/*
* Export App configuration variables
*/
exports.__esModule = true;
var enviroments = {};
// Staging (default enviroment)
enviroments.development = {
    httpPort: 3000,
    httpsPort: 5001,
    envName: 'development'
};
enviroments.production = {
    httpPort: 8080,
    httpsPort: 5001,
    envName: 'production'
};
var currentEnviroment = typeof (process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV.toLocaleLowerCase() : '';
var enviromentToExport = typeof (enviroments[currentEnviroment]) == 'object' ? enviroments[currentEnviroment] : enviroments.development;
exports["default"] = enviromentToExport;
//# sourceMappingURL=config.js.map