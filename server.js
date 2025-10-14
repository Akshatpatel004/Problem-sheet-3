import http from 'http';
import url from 'url';
const port = 3000;
import {StudentLogic} from "./controller/student_logic.js"
import {CourseLogic} from "./controller/course_logic .js"
import { asyncTryCatch } from './Utils/async_try_catch.js';
import { connectDB } from './DB/mongodb.js';

await connectDB();

const server = http.createServer(async (req, res) => {
    const parseUrl = url.parse(req.url,true);
    const path = parseUrl.pathname;
    const querry = parseUrl.query;

    console.log(`current path : - ${path}`);
    res.setHeader("Content-Type", "application/json");

    if (path == "/") {
        res.end("this is home page");
    }else if(path == "/api/students/all" && req.method==="GET"){
        asyncTryCatch(StudentLogic.fetch_all(req,res));
    }else if(path == "/api/students/insert" && req.method==="POST"){
        asyncTryCatch(StudentLogic.insertStudent(req,res));
    }else if(path === "/api/students/findcourse" && req.method==="POST"){
        if (querry.course) {
            asyncTryCatch(StudentLogic.student_findcourse(req,res,querry.course));
        } else {
            return
        }
    }else if(path === "/api/students/moremarks" && req.method==="POST"){
        if (querry.mark) {
            asyncTryCatch(StudentLogic.more_marks(req,res,querry.mark));
        } else {
            return
        }
    }else if(path === "/api/students/updateMark" && req.method==="POST"){
        if (querry.course && querry.mark) {
            asyncTryCatch(StudentLogic.update_allStudentMark(req,res,querry.course, querry.mark));
        } else {
            return
        }
    }
    // course
    else if(path == "/course" && req.method==="POST"){
        asyncTryCatch(CourseLogic.insertCourse(req,res));
    }
});


server.listen(port, () => {
    console.log(`server listen port number : - http://localhost:${port}`)
})