import mongoose from "mongoose";
const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/BMCCA');
        console.log('MongoDB Connected Successfully');
    } catch (error) {
        console.error('MongoDB Connection Error:', error.message);
        process.exit(1);
    }
};

export {connectDB};