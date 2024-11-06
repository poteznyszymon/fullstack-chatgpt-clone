import mongoose from "mongoose";

export const connectToMongo = async () => {
  try {
    const connectionResponse = await mongoose.connect(process.env.MONGO_URI);
    console.log(
      "MongoDB connected successfully: ",
      connectionResponse.connection.host
    );
  } catch (error) {
    console.log("Error connection to mongoDB: ", error.message);
    process.exit(1);
  }
};
