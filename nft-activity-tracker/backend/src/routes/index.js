"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.baseURL = void 0;
const express_1 = require("express");
const routes = (0, express_1.Router)();
routes.post("");
exports.baseURL = "/api/v1";
exports.default = routes;
