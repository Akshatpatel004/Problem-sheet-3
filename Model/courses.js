import mongoose from 'mongoose';
const { Schema } = mongoose;

const courseschema = new Schema({
    courseid:{
        type: String,
        unique:true,
        required: true
    },
    courseName:{
        type : String,
        required: [true,"course name is required"],
        match: [/^(?=.{8,15}$)(?!.*[_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,"username is invalid , it should contain 8-15 alphanumericletter and be unique"]
    },
    credit:{  
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

export default mongoose.model('Course',courseschema);