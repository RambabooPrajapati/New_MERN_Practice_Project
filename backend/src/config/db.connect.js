import mongoose from "mongoose";


const dbConnection = async()=>{
    try {
        await mongoose.connect(`${process.env.MONGO_URI}/${process.env.DB_NAME}`);
        console.log("DB connected successfully");
    } catch (error) {
        console.log(error.message);
        process.exit(1)
    }
}
export default dbConnection;