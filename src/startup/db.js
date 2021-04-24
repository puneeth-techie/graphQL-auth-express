import mongoose from "mongoose";

/** starting MongoDB data base */
const connectDB = async () => {
  try {
    const url = process.env.MONGODB_URL;
    const conn = await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log(`DB connected to successfully: ${conn.connection.host}`);
  } catch (error) {
    console.log(`Cannot connect to DB: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
