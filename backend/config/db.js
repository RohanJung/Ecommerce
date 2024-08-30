import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: '../.env' });

const connectDb =  async()  => {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log('sucessfully connected');
    }
    catch(error){        
        console.log(`ERROR: ${error.message}`);
        process.exit(0);
    }
}
export default connectDb;       
                    