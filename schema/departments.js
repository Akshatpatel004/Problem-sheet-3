const mongoose = require('mongoose');
const { Schema } = mongoose;

const departmentschema = new Schema({
    deptId:{
        type: String,
        unique:true,
        required: true
    },
    deptName:{
        type : String,
        required: [true,"Username is required"],
        match: [/^(?=.{0,5}$)(?!.*[_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,""]
    },
    totalFaculty:{
        type : Number,
        required: true
    },
    coursesOffered:{
        type : String,
        required: true
    },
    location:{
        type: String,
        required: true
    },

},{versionKey:false});

module.exports=mongoose.model('Department',departmentschema);