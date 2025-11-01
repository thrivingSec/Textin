import mongoose from "mongoose"
export const connectDB = async () => {
  try {
    const db = await mongoose.connect(process.env.DB_URL, {
      dbName:"Textin"
    })
    return db.connection.host;
  } catch (error) {
    return error;
  }
}