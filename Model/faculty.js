import mongoose from 'mongoose';
const { Schema } = mongoose;

const facultyschema = new Schema({
    facultyid:{
        type: String,
        unique:true,
        required: true
    },
    name:{
        type : String,
        required: [true,"Username is required"],
        match: [/^(?=.{8,15}$)(?!.*[_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,"username is invalid , it should contain 8-15 alphanumericletter and be unique"]
    },department:{
        type : String,
        required: true
    },
    email:{
        type : String,
        unique:true,
        required: true,
        match: [/^\S+@\S+\.\S+$/,"Invalid email format."]
    },
    experienceYear:{
        type : Number,
        required: true
    },
    subjects:{
        type: String,
        required: true
    },

},{versionKey:false});

export default mongoose.model('Faculty',facultyschema);