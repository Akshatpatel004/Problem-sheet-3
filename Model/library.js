import mongoose from 'mongoose';
const { Schema } = mongoose;

const libraryschema = new Schema({
    bookId:{
        type: String,
        unique:true,
        required: true
    },
    title:{
        type : String,
        required: true
    },
    author:{
        type : String,
        required: true
    },
    category:{
        type : String,
        unique:true,
        required: true,
    },
    isAvailable:{
        type : Boolean,
        required: true
    },
    issuedTo:{
        type: String,
        required: true
    },
    issuedTo:{
        type: Date,
        required: true
    }

},{versionKey:false});

module.exports=mongoose.model('Library',libraryschema);