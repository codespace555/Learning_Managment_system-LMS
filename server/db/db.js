import mongoose from "mongoose";

const connectDb = async () => {
  try {
    const dbConnect = await mongoose.connect(
      `${process.env.MONGO_URI}/${DB_NAME}`
    );
    console.log("MongoDB Connected:", dbConnect.connection.host);
  } catch (err) {
    console.log(`MongoDB connection error: ${err}`);
    process.exit(1);
  }
};

export default connectDb;
