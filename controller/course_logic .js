import Course from '../Model/courses.js';
import mongoose from "mongoose";

const CourseLogic = {
    insertCourse: async (req, res) => {
        let body = "";
        
        req.on('data', (chunks) => {
            body += chunks.toString();
        });
        
        req.on("end", async () => {
            try {
                const courseData = await JSON.parse(body);
                
                if (!courseData.courseId || !courseData.courseName || !courseData.credits || !courseData.durationMonths || !courseData.department ) {
                    res.statusCode = 400;
                    res.setHeader("Content-Type", "application/json");
                    res.end(JSON.stringify({
                        "error": "missing key value"
                    }));
                    return;
                }
                
                const newCourse = new Course(courseData);
                const savedCourse = await newCourse.save();
                res.statusCode = 201;
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify({
                    message: "Course created successfully",
                    data: savedCourse
                }));
            } catch (error) {
                res.statusCode = 400;
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify({
                    error: error.message
                }));
            }
        });
    },


    moreCredit: async (req, res, cre) => {
        try {
            const morecredit=await Course.find({credits : {$gt:cre}});
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({
                "message": "students more than "+cre+" credit",
                "data :- ":morecredit
            }))
        } catch (error) {
            res.statusCode = 400;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({
                error: error.message
            })); 
        }
    },


    fetch_all: async (req, res) => {
        try {                        
            const fetchall=await  Course.find();
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({
                "message:- ":"Total Courses .",
                "data :- ":fetchall
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


    duration_sort: async (req, res) => {
        try {
            moo
            const fetchall=await  Course.find().sort({"durationMonths":1});
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({
                "message:- ":"durationMonths sorted in ascending order",
                "data :- ":fetchall
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


    rename_collection: async (req, res,oldname,newName) => {
        try {
            await mongoose.connection.db.renameCollection(oldname,newName)
            res.setHeader("Content-Type", "application/json");
            res.end(`Collection name has been changed successfully from ${oldname} to ${newName}`)
        } catch (error) {
            console.error('Error:', error);
            res.statusCode = 400;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.parse({
                "error": error.message
            }));
        }
    }
};

export {CourseLogic};