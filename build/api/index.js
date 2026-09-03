"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = handler;
require("dotenv/config");
const app_1 = __importDefault(require("../src/app"));
const database_1 = require("../src/config/database");
async function handler(req, res) {
    try {
        await (0, database_1.connectDB)();
        (0, app_1.default)(req, res);
    }
    catch (error) {
        console.error('Unable to connect to database:', error);
        res.status(500).json({
            error: 'Unable to connect to database'
        });
    }
}
