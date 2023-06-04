import mongoose from "mongoose";

const connectMongo = (handler) => async (req, res) => {
  try {
    const { connection } = await mongoose.connect(process.env.MONGO_URI);

    if (connection.readyState == 1) {
      return handler(req, res);
    }
  } catch (error) {
    return Promise.reject(error);
  }
};

export default connectMongo;
