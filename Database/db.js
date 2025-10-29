// /Database/db.js
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGOURI;
if (!MONGODB_URI) throw new Error("❌ MONGODB_URI missing");

let cached = global.mongoose || { conn: null, promise: null };

async function database() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        dbName: "test", // or whatever name you use
      })
      .then((m) => m);
  }

  cached.conn = await cached.promise;
  global.mongoose = cached;
  return cached.conn;
}

export default database;
