import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`Database connected: ${mongoose.connection.host}`);
  } catch (err) {
    console.log("Can't connect to database", err.message);
    process.exit(1);
  }
};

export default connectDB;
