"use strict";
exports.__esModule = true;
var fs = require("fs");
var path = require("path");
var JsonFile = /** @class */ (function () {
    function JsonFile() {
        this.baseUrl = path.join(__dirname, '/../../.data');
    }
    JsonFile.prototype.create = function (dir, fileName, data, cb) {
        var _this = this;
        var filePath = this.baseUrl + "/" + dir + "/" + fileName + ".json";
        fs.open(filePath, 'wx', function (error, fileDescriptor) {
            if (!error && fileDescriptor) {
                var stringData = JSON.stringify(data);
                fs.writeFile(filePath, stringData, function (writeFile) {
                    if (!writeFile) {
                        fs.close(fileDescriptor, function (closeFile) {
                            if (!closeFile) {
                                cb(false);
                            }
                            else {
                                _this.error('Error Closing new File', cb);
                            }
                        });
                    }
                    else {
                        _this.error('Error writing to new file', cb);
                    }
                });
            }
            else {
                _this.error('Could not create new file, it may already exist', cb);
            }
        });
    };
    JsonFile.prototype.reade = function (dir, fileName, cb) {
        var filePath = this.baseUrl + "/" + dir + "/" + fileName + ".json";
        fs.readFile(filePath, 'utf8', function (error, data) {
            cb(error, data);
        });
    };
    JsonFile.prototype.update = function (dir, fileName, data, cb) {
        var filePath = this.baseUrl + "/" + dir + "/" + fileName + ".json";
        fs.open(filePath, 'r+', function (error, fileDescriptor) {
            if (!error && fileDescriptor) {
                var stringData_1 = JSON.stringify(data);
                fs.truncate(filePath, fileDescriptor, function (error) {
                    fs.writeFile(filePath, stringData_1, function (error) {
                        if (!error) {
                            fs.close(fileDescriptor, function (error) {
                                if (!error) {
                                    cb(false);
                                }
                                else {
                                    cb('erorr when closing file');
                                }
                            });
                        }
                        else {
                            cb('writing to existing file');
                        }
                    });
                });
            }
            else {
                cb('Could not open the file for updating, it may not exist yet');
            }
        });
    };
    JsonFile.prototype["delete"] = function (dir, fileName, cb) {
        var filePath = this.baseUrl + "/" + dir + "/" + fileName + ".json";
        fs.unlink(filePath, function (erorr) {
            if (!erorr) {
                cb(false);
            }
            else {
                cb("Error deleting " + fileName);
            }
        });
    };
    JsonFile.prototype.error = function (message, cb) {
        return cb(message || 'Internal Error');
    };
    return JsonFile;
}());
exports.JsonFile = JsonFile;
//# sourceMappingURL=JsonFile.js.map