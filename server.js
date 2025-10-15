import http from 'http';
import url from 'url';
const port = 3000;
import {StudentLogic} from "./controller/student_logic.js"
import {CourseLogic} from "./controller/course_logic .js"
import { FacultyLogic } from "./controller/faculty_logic.js"
import { DepartmentLogic } from "./controller/department_logic.js"
import { LibraryLogic } from "./controller/library_logic.js"
import { asyncTryCatch } from './Utils/async_try_catch.js';
import { connectDB } from './DB/mongodb.js';

await connectDB();

const server = http.createServer(async (req, res) => {
    const parseUrl = url.parse(req.url,true);
    const path = parseUrl.pathname;
    const querry = parseUrl.query;

    console.log(`current path : - ${path}`);
    res.setHeader("Content-Type", "application/json");

    // student
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
    else if(path == "/api/course/insert" && req.method==="POST"){
        asyncTryCatch(CourseLogic.insertCourse(req,res));
    } else if(path == "/api/course/fetchall" && req.method==="GET"){
        asyncTryCatch(CourseLogic.fetch_all(req,res));
    }else if(path == "/api/course/moreCredit" && req.method==="POST"){
        if (querry.credit ) {
            asyncTryCatch(CourseLogic.moreCredit(req,res,querry.credit));
        } else {
            return
        }
    }else if(path == "/api/course/duration_sort" && req.method==="GET"){
        asyncTryCatch(CourseLogic.duration_sort(req,res));
    } else if(path == "/api/course/rename_collection" && req.method==="PUT"){
        if (querry.oldname && querry.newname) {
            asyncTryCatch(CourseLogic.rename_collection(req,res,querry.oldname,querry.newname));
        } else {
            return
        }
    }
    // faculty
    else if (path == "/api/faculty/all" && req.method === "GET") {
        asyncTryCatch(FacultyLogic.fetch_all(req, res));
    } else if (path == "/api/faculty/insert" && req.method === "POST") {
        asyncTryCatch(FacultyLogic.insertFaculty(req, res));
    } else if (path == "/api/faculty/experienced-cs-r" && req.method === "GET") {
        asyncTryCatch(FacultyLogic.findExperiencedCSFacultyStartingWithR(req, res));
    } else if (path == "/api/faculty/update" && req.method === "PUT") {
        if (querry.facultyid) {
            asyncTryCatch(FacultyLogic.updateContactDetails(req, res, querry.facultyid));
        } else {
            res.statusCode = 400;
            res.end(JSON.stringify({
                "error": "facultyid parameter is required"
            }));
        }
    }
    // department
    else if (path == "/api/department/all" && req.method === "GET") {
        asyncTryCatch(DepartmentLogic.fetch_all(req, res));
    } else if (path == "/api/department/insert" && req.method === "POST") {
        asyncTryCatch(DepartmentLogic.insertDepartment(req, res));
    } else if (path == "/api/department/small-or-blocka" && req.method === "GET") {
        asyncTryCatch(DepartmentLogic.findSmallOrBlockA(req, res));
    } else if (path == "/api/department/name-courses" && req.method === "GET") {
        asyncTryCatch(DepartmentLogic.findAllDeptNameAndCourses(req, res));
    }
    // library
    else if (path == "/api/Library/all" && req.method === "GET") {
        asyncTryCatch(LibraryLogic.fetch_all(req, res));
    } else if (path == "/api/Library/insert" && req.method === "POST") {
        asyncTryCatch(LibraryLogic.insertLibrary(req, res));
    } else if (path == "/api/Library/FindCategory" && req.method === "GET") {
        if (querry.category) {
            asyncTryCatch(LibraryLogic.FindCategory(req, res,querry.category));
        } else {
            return
        }
    } else if (path == "/api/Library/deleteCollection" && req.method === "DELETE") {
        if (querry.collectionName) {
            asyncTryCatch(LibraryLogic.DeleteCollection(req, res,querry.collectionName));
        } else {
            return
        }
    }
});


server.listen(port, () => {
    console.log(`server listen port number : - http://localhost:${port}`)
})