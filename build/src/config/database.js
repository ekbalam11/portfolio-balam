"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = connectDB;
const mongoose_1 = __importDefault(require("mongoose"));
const cached = global.mongooseCache ?? {
    connection: null,
    promise: null
};
global.mongooseCache = cached;
async function connectDB() {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
        throw new Error('MONGODB_URI no está definida');
    }
    if (cached.connection) {
        return cached.connection;
    }
    if (!cached.promise) {
        cached.promise = mongoose_1.default.connect(uri, {
            serverSelectionTimeoutMS: 10000,
            maxPoolSize: 5,
            bufferCommands: false
        });
    }
    cached.connection = await cached.promise;
    return cached.connection;
}
