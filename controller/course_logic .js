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

export {CourseLogic};