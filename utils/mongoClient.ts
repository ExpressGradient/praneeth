import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

export default client;
