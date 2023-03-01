import mongoDB from "mongoDB";
import dotenv from "dotenv";

type cols = {
  users: mongoDB.Collection;
  notes: mongoDB.Collection;
  cards: mongoDB.Collection;
  resources: mongoDB.Collection;
}

export let collections: cols;

dotenv.config();
const DB_CONN_STRING = String(process.env["DB_CONN_STRING"]) || "";

export async function connectToDatabase() {
  const client: mongoDB.MongoClient = new mongoDB.MongoClient(DB_CONN_STRING);

  await client.connect();

  const db: mongoDB.Db = client.db(process.env.DB_NAME);

  const userCollection: mongoDB.Collection = db.collection("user");
  collections.users = userCollection;

  const notesCollection: mongoDB.Collection = db.collection("notes");
  collections.notes = notesCollection;

  const cardsCollection: mongoDB.Collection = db.collection("cards");
  collections.cards = cardsCollection;

  const resourcesCollection: mongoDB.Collection = db.collection("resources");
  collections.resources = resourcesCollection;

  console.log(`Successfully connected to database: ${db.databaseName}`);
}
