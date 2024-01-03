import { MongoClient } from "mongodb";

const MONGODB_URI =
  "mongodb+srv://brahimelkaceh:sjOvoIDtlv0bBBl0@cluster1.tikgpsk.mongodb.net/events";

export const connectToDatabase = async () => {
  const client = await MongoClient.connect(MONGODB_URI);
  return client;
};

export const insertDocument = async (client, collection, data) => {
  const db = client.db();
  const result = await db.collection(collection).insertOne(data);
  console.log(result);
  return result;
};

export const getDocument = async (client, collection, sort) => {
  try {
    const db = client.db();

    // Using { id } as the query for the specific id
    const result = await db
      .collection("comments")
      .find()
      .sort({ _id: -1 })
      .toArray();

    if (result.length === 0) {
      // Handle the case when no document is found with the specified id
      return null; // or throw an error, depending on your use case
    }

    return result; // Assuming you expect only one document with the given id
  } catch (error) {
    console.error("Error in getDocument:", error);
    throw error; // You might want to handle or log the error accordingly
  }
};
