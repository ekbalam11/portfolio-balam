import mongoose from 'mongoose';

type MongooseCache = {
    connection: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
};

declare global {
    // eslint-disable-next-line no-var
    var mongooseCache: MongooseCache | undefined;
}

const cached: MongooseCache = global.mongooseCache ?? {
    connection: null,
    promise: null
};

global.mongooseCache = cached;

export async function connectDB(): Promise<typeof mongoose> {
    const uri = process.env.MONGODB_URI;

    if (!uri) {
        throw new Error('MONGODB_URI no está definida');
    }

    if (cached.connection) {
        return cached.connection;
    }

    if (!cached.promise) {
        cached.promise = mongoose.connect(uri, {
            serverSelectionTimeoutMS: 10000,
            maxPoolSize: 5,
            bufferCommands: false
        });
    }

    cached.connection = await cached.promise;

    return cached.connection;
}