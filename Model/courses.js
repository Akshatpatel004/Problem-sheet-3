import mongoose from 'mongoose';
const { Schema } = mongoose;

const courseschema = new Schema({
    courseId:{
        type: String,
        unique:true,
        required: true
    },
    courseName:{
        type : String,
        required: [true,"course name is required"],
        // match: [/^(?=.{0,15}$)(?!.*[_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,"username is invalid , it should contain 0-15 alphanumericletter and be unique"]
    },
    credits:{
        type : Number,
        required: true
    },
    durationMonths:{
        type : Number,
        required: true,
    },
    department:{
        type: String,
        required: true
    },

},{versionKey:false});

// Fixed: Changed to ES6 export
export default mongoose.model('Course',courseschema);