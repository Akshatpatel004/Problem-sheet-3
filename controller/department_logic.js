import Department from '../Model/departments.js';

const DepartmentLogic = {
    // Find departments where totalFaculty < 10 OR located in "Block A"
    findSmallOrBlockA: async (req, res) => {
        try {
            // Using $or operator for two conditions
            const departments = await Department.find({
                $or: [
                    { totalFaculty: { $lt: 10 } },
                    { location: "Block A" }
                ]
            });

            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({
                "message": "Departments with totalFaculty < 10 or located in Block A",
                "count": departments.length,
                "data": departments
            }));
        } catch (error) {
            console.error('Error:', error);
            res.statusCode = 400;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({
                "error": error.message
            }));
        }
    },

    // Find all departments and show only deptName and coursesOffered
    findAllDeptNameAndCourses: async (req, res) => {
        try {
            // Using .select() to show only specific fields
            const departments = await Department.find()
                .select("deptName coursesOffered -_id");  // -_id excludes the _id field

            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({
                "message": "All departments - deptName and coursesOffered only",
                "count": departments.length,
                "data": departments
            }));
        } catch (error) {
            console.error('Error:', error);
            res.statusCode = 400;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({
                "error": error.message
            }));
        }
    },

    // Insert new department
    insertDepartment: async (req, res) => {
        console.log("enter in insertDepartment");
        let body = "";
        req.on('data', (chunks) => {
            body += chunks.toString();
        });

        req.on("end", async () => {
            try {
                const parseData = JSON.parse(body);

                // Validation check
                if (!parseData.deptId || !parseData.deptName || !parseData.totalFaculty ||
                    !parseData.coursesOffered || !parseData.location) {
                    res.statusCode = 400;
                    res.setHeader("Content-Type", "application/json");
                    res.end(JSON.stringify({
                        "error": "missing key value"
                    }));
                    return;
                }

                const newDepartment = new Department(parseData);
                const departmentSaved = await newDepartment.save();

                console.log(parseData);
                res.statusCode = 201;
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify({
                    "message": "Department created successfully",
                    "data": departmentSaved
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

    // Fetch all departments
    fetch_all: async (req, res) => {
        try {
            const allDepartments = await Department.find();
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({
                "data": allDepartments
            }))
        } catch (error) {
            console.error('Error:', error);
            res.statusCode = 400;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({
                "error": error.message
            }));
        }
    }
}

export { DepartmentLogic };

