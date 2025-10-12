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
                    // res.status().json() doesn't exist in HTTP module
                    // Use this instead:
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
                
                // res.status == 201 (using == comparison, not assignment!)
                // Use = for assignment:
                res.statusCode = 201;
                res.setHeader("Content-Type", "application/json");
                
                // res.end() needs a STRING, not object
                // Use JSON.stringify():
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
    }
}

const TestClass = {
    homeRoute: async (req, res) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end("let me see");
    }
}

import Course from '../Model/courses.js';

const CourseLogic = {
    insertCourse: async (req, res) => {
        let body = "";
        
        req.on('data', (chunks) => {
            body += chunks.toString();
        });
        
        req.on("end", async () => {
            try {
                const courseData = JSON.parse(body);
                
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
    }
};

export { TestClass, StudentLogic , CourseLogic };