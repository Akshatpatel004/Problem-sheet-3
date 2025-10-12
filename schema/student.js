const mongoose = require('mongoose');
const { Schema } = mongoose;

const Studentschema = new Schema({
    studentid:{
        type: String,
        unique:true,
        required: true
    },
    name:{
        type : String,
        required: [true,"Username is required"],
        match: [/^(?=.{8,15}$)(?!.*[_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,"username is invalid , it should contain 8-15 alphanumericletter and be unique"]
    },
    email:{
        type : String,
        unique:true,
        required: true,
        match: [/^\S+@\S+\.\S+$/,"Invalid email format."]
    },
    marks:{
        type : Number,
        required: true
    },
    courseEnrolled:{
        type: String,
        required: true
    },
    admissionDate:{
        type:Date,
        required: true
    }
},{versionKey:false});

module.exports=mongoose.model('Students',Studentschema);