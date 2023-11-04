import mongoose from "mongoose";

const conectDB = async () => {
  try {
    const db = await mongoose.connect(
      "mongodb+srv://root:root@cluster0.sgommjq.mongodb.net/?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    const url = `${db.connection.host}:${db.connection.port}`;
    console.log(`MongoDB conectado en : ${url}`);
  } catch (e) {
    console.log(e);
  }
};

export default conectDB;
