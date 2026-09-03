"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const app_1 = __importDefault(require("./app"));
const database_1 = require("./config/database");
const PORT = Number(process.env.PORT) || 3000;
async function startServer() {
    await (0, database_1.connectDB)();
    console.log('Connected to the database');
    app_1.default.listen(PORT, () => {
        console.log(`Server listening on port: ${PORT}`);
    });
}
startServer().catch((error) => {
    console.error('Unable to start server:', error);
    process.exit(1);
});
