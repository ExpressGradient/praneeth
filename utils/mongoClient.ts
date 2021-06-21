import { Db, MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

let cachedDB: Db = null;

export const connectDB = async (dbName: string) => {
    if (cachedDB) {
        return cachedDB;
    }

    await client.connect();
    cachedDB = client.db(dbName);

    return cachedDB;
};

export default client;
