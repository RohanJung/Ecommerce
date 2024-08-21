import mongoose from "mongoose";

const connectDb =  async()  => {
    try{
        await mongoose.connect('mongodb://127.0.0.1:27017/test');
        console.log('sucessfully connected');
    }
    catch(eror){        
        console.log(`ERROR: ${eror.message}`);
        process.exit(0);
    }
}
export default connectDb;       
                    