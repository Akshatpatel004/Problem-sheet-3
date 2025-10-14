import { monitorEventLoopDelay } from 'perf_hooks';
import Student from '../Model/student.js';

const StudentLogic = {
    insertStudent: async (req, res) => {
        console.log("enter in insertStudent");
        let body = "";
        req.on('data', (chunks) => {
            body += chunks.toString();
        });

        req.on("end", async () => {
            try {
                const parseData = JSON.parse(body);

                // Better validation check
                if (!parseData.studentid || !parseData.name || !parseData.marks || 
                    !parseData.email || !parseData.courseEnrolled || !parseData.admissionDate) {
                    res.statusCode = 400;
                    res.setHeader("Content-Type", "application/json");
                    res.end(JSON.stringify({
                        "error": "missing key value"
                    }));
                    return;
                }

                const newStudent = new Student(parseData);
                const studentSaved = await newStudent.save();

                console.log(parseData);
                res.statusCode = 201;
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify({
                    "message": "Student created successfully",
                    "data": studentSaved
                }));
                
            } catch (error) {
                console.error('Error:', error);
                res.statusCode = 400;
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify({
                    "error": error.message
                }));
            }
        });
    },


    student_findcourse: async (req, res,course) => {
        try {            
            const findcourse=await Student.find({courseEnrolled : course}).select("name marks");
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({"data :- ":findcourse}))
        } catch (error) {
            console.error('Error:', error);
            res.statusCode = 400;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.parse({
                "error": error.message
            }));
        }
    },


    more_marks: async (req, res,marks) => {
        try {                        
            const moremarks=await  Student.find({marks : {$gt:marks}});
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({
                "message": "students more than "+marks+" marks",
                "data :- ":moremarks
            }))
        } catch (error) {
            console.error('Error:', error);
            res.statusCode = 400;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.parse({
                "error": error.message
            }));
        }
    },


    fetch_all: async (req, res) => {
        try {                        
            const moremarks=await  Student.find();
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({
                "data :- ":moremarks
            }))
        } catch (error) {
            console.error('Error:', error);
            res.statusCode = 400;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.parse({
                "error": error.message
            }));
        }
    },


    update_allStudentMark: async (req, res,course,mark) => {        
        try {                        
            const updateMark=await Student.updateMany(
                {courseEnrolled : course},
                {$set:{marks : mark}}
            );
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({
                "data :- ":updateMark
            }))
        } catch (error) {
            console.error('Error:', error);
            res.statusCode = 400;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.parse({
                "error": error.message
            }));
        }
    }
}


export {StudentLogic};