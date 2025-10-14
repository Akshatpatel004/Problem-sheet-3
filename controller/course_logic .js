import Course from '../Model/courses.js';


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
                "message": "students more than "+cre+" marks",
                "data :- ":morecredit
            }))
        } catch (error) {
            res.statusCode = 400;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({
                error: error.message
            })); 
        }
    }
};

export {CourseLogic};