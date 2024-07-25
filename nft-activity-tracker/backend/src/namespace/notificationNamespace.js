"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// listeners
const notificationListener_1 = __importDefault(require("@/listeners/notificationListener"));
exports.default = (io) => {
    io.on("connection", (socket) => {
        // once user is ...
        (0, notificationListener_1.default)(socket, io);
    });
};
