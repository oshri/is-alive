"use strict";
exports.__esModule = true;
// Define Router Handlers
var handlers = {
    ping: function (data, callback) {
        callback(null, { name: 'Hi i am Ping Handler' });
    },
    notFound: function (data, callback) {
        callback(404);
    }
};
exports.handlers = handlers;
// Define Request router
var router = {
    ping: handlers.ping
};
exports.router = router;
//# sourceMappingURL=router.js.map