import mongoose from "mongoose";

const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URL);

  console.log(JSON.stringify({
    level: "info",
    message: "MongoDB connected",
    host: conn.connection.host,
    timestamp: new Date().toISOString()
  }));

  return conn;
};

export default connectDB;