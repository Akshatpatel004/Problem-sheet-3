import mongoose from "mongoose";
import http from 'http';
import url from 'url';

import { CourseLogic ,StudentLogic} from "../Problem-sheet-3/controller/logic.js"
import { asyncTryCatch } from './Utils/async_try_catch.js';
const port=3000

async function mongo_connect() {
    let connect =  await mongoose.connect("mongodb://localhost:27017/BMCCA");
    if (connect) {
        console.log("MongoDB connect successfully");        
    }else{
        console.log("MongoDB connectiom fail"); 
    }
}
await mongo_connect()

const server = http.createServer(async (req,res)=>{
    const path=url.parse(req.url,true).pathname;
    const query=url.parse(req.url,true).query;

    if (path==="/" && req.method ==='GET') {
        res.end("this is home page")
    } else if (path==='/api/students/create' && req.method ==='POST') {
        asyncTryCatch(StudentLogic.insertStudent(req,res));
    }else if (path==='/api/course/create' && req.method ==='POST') {
        asyncTryCatch(CourseLogic.insertCourse(req,res));
    }
})

server.listen(port , ()=>{
    console.log(`your server is running in https://localhost:${port}`);
})