"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
const PORT = Number(process.env.PORT) || 3000;
const MONGODB_URI = process.env.MONGODB_URI;
async function startServer() {
    if (!MONGODB_URI) {
        throw new Error('MONGODB_URI no está definida en el archivo .env');
    }
    await mongoose_1.default.connect(MONGODB_URI);
    console.log('Connected to the database');
    app_1.default.listen(PORT, () => {
        console.log(`Server listening on port: ${PORT}`);
    });
}
startServer().catch((error) => {
    console.error('Unable to start server:', error);
    process.exit(1);
});
