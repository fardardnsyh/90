import { MongoClient, MongoClientOptions } from "mongodb";

// Check if the MONGODB_URI environment variable is set
if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

// Extend MongoClientOptions interface to include dbName
interface CustomMongoClientOptions extends MongoClientOptions {
  dbName: string;
}
// Type assertion to resolve TypeScript error
declare const global: {
  _mongoClientPromise: Promise<MongoClient> | undefined;
};

const uri: string = process.env.MONGODB_URI;
const options: CustomMongoClientOptions = {
  dbName: "form-builder",
};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise;
