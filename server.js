import http from 'http';
import 'dotenv/config';
import url from 'url';
import { CourseLogic ,StudentLogic, TestClass } from "../Problem-sheet-3/controller/logic.js"
import { asyncHandler } from './Utils/async_handler.js';
import { connectDB } from './DB/mongodb.js';

await connectDB();



const server = http.createServer(async (req, res) => {
    const parseUrl = url.parse(req.url);
    const path = parseUrl.pathname;

    console.log(`current path : - ${path}`);

    res.setHeader("Content-Type", "application/json");

    if (path == "/") {
        await TestClass.homeRoute(req, res);
    }else if(path == "/data"){
        asyncHandler(StudentLogic.insertStudent(req,res));
    }else if(path == "/course"){
        asyncHandler(CourseLogic.insertCourse(req,res));
    }
});




const port = process.env.PORT;
server.listen(port, () => {
    console.log(`server listen port number : - ${port}`)
})