import mongoose from "mongoose";

mongoose.set("strictQuery", false)
const connectDb = async () => {
  try {
    const dbConnect = await mongoose.connect(
      `${process.env.MONGO_URI}/LMS`
    );
    console.log("MongoDB Connected:", dbConnect.connection.host);
  } catch (err) {
    console.log(`MongoDB connection error: ${err}`);
    process.exit(1);
  }
};

export default connectDb;
