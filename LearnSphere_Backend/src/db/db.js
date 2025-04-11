import mongoose from 'mongoose';
import { DB_name } from '../constants.js';

const connectDB = async () => {
    try {
        const ConnectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_name}`);
        console.log(`MongoDB Connected: !! DB HOST: ${ConnectionInstance.connection.host}`);

    } catch (error) {
        console.log("Error Connecting to dataBase", error);
        process.exit(1);
    }
}

export default connectDB;