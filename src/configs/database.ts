import mongoose, {ConnectOptions} from "mongoose"

export default async () => {
  try {
    mongoose.set('strictQuery', false)
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log("Connected to MongoDB database");
  } catch (error) {
    console.log("<::: Couldn't connect to database ", error);
  }
};
