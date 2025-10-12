import mongoose from 'mongoose';
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
        //Fix : Remove the strict regex or update it:
        minlength: [3, "Name must be at least 3 characters"],
        maxlength: [50, "Name must be less than 50 characters"]
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

export default mongoose.model('Students',Studentschema);