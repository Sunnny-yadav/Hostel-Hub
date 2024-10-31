import mongoose from "mongoose"
import { DB_NAME } from '../constant.js'

export const ConnectDB = async ()=>{
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);
        console.log("Database connected Successfully :: ",connectionInstance.connection.name);
    } catch (error) {
        console.log("MongoDB Connection Failed :: index.js ::", error)
    }
}
