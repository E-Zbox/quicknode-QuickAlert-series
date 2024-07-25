"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = require("dotenv");
const http_1 = require("http");
const path_1 = require("path");
// .
const app_1 = __importDefault(require("./app"));
// initialize env
(0, dotenv_1.config)({ path: (0, path_1.join)(__dirname, `../.env.${process.env.NODE_ENV}`) });
const { PORT } = process.env;
// namespaces
const namespace_1 = require("./namespace");
// routes
const routes_1 = __importStar(require("./routes"));
// app
const app = new app_1.default().app;
// server
const httpServer = (0, http_1.createServer)(app);
// let's bind socket.io to our http server
(0, namespace_1.instantiateNamespacesIO)(httpServer);
app.get("/alive", (req, res) => {
    return res.status(200).json({
        message: "I'm alive",
        success: true,
    });
});
app.use((0, cors_1.default)({
    origin: "*",
}));
app.use(`${routes_1.baseURL}`, routes_1.default);
app.use((err, req, res, next) => {
    let statusCode = 500;
    let response = {
        data: null,
        error: "",
        success: false,
    };
    let error;
    if (typeof err === "string") {
        const [name, ...errArray] = String(err).split(":");
        error = {
            name,
            message: errArray.join(":"),
            stack: err,
        };
    }
    else {
        error = Object.assign(Object.assign({}, err), { name: err.name, message: err.message, stack: err.stack });
    }
    switch (error.name) {
        case "ReferenceError":
            statusCode = 500;
            response = Object.assign(Object.assign({}, response), { error: error.message });
            break;
        default:
            console.log("----");
            console.log(error.name);
            console.log(error);
            response.error = "Something went wrong!!";
    }
    return res.status(statusCode).json(response);
});
const server = httpServer.listen(PORT, () => {
    console.log(`Server is listening on PORT ${PORT}`);
});
