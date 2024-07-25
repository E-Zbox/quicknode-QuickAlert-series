"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.instantiateNamespacesIO = exports.baseSocketURL = exports.socketHandshakePath = void 0;
const socket_io_1 = require("socket.io");
// middlewares
// namespaces
exports.socketHandshakePath = "/api/socket.io";
exports.baseSocketURL = `${exports.socketHandshakePath}/v1`;
const instantiateNamespacesIO = (httpServer) => {
    const io = new socket_io_1.Server(httpServer, { path: exports.socketHandshakePath });
    // io.use(middlewares)
};
exports.instantiateNamespacesIO = instantiateNamespacesIO;
