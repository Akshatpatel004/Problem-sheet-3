import Faculty from '../Model/faculty.js';

const FacultyLogic = {
    // Find faculty with more than 5 years experience in Computer Science department
    // AND whose names start with 'R' (using regex)
    findExperiencedCSFacultyStartingWithR: async (req, res) => {
        try {
            // Two conditions combined:
            // 1. experienceYear > 5 AND department = "Computer Science"
            // 2. name starts with "R" (case-insensitive regex)
            const faculty = await Faculty.find({
                $and: [
                    {
                        experienceYear: { $gt: 5 },
                        department: "Computer Science"
                    },
                    {
                        name: { $regex: /^R/i }  // Regex: starts with R (case-insensitive)
                    }
                ]
            });

            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({
                "message": "Faculty members with >5 years experience in Computer Science department, names starting with 'R'",
                "count": faculty.length,
                "data": faculty
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

    // Insert new faculty member
    insertFaculty: async (req, res) => {
        console.log("enter in insertFaculty");
        let body = "";
        req.on('data', (chunks) => {
            body += chunks.toString();
        });

        req.on("end", async () => {
            try {
                const parseData = JSON.parse(body);

                // Validation check
                if (!parseData.facultyid || !parseData.name || !parseData.department ||
                    !parseData.email || !parseData.experienceYear || !parseData.subjects) {
                    res.statusCode = 400;
                    res.setHeader("Content-Type", "application/json");
                    res.end(JSON.stringify({
                        "error": "missing key value"
                    }));
                    return;
                }

                const newFaculty = new Faculty(parseData);
                const facultySaved = await newFaculty.save();

                console.log(parseData);
                res.statusCode = 201;
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify({
                    "message": "Faculty created successfully",
                    "data": facultySaved
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

    // Fetch all faculty
    fetch_all: async (req, res) => {
        try {
            const allFaculty = await Faculty.find();
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({
                "data": allFaculty
            }))
        } catch (error) {
            console.error('Error:', error);
            res.statusCode = 400;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({
                "error": error.message
            }));
        }
    },

    // Update faculty contact details
    updateContactDetails: async (req, res, facultyid) => {
        let body = "";
        req.on('data', (chunks) => {
            body += chunks.toString();
        });

        req.on("end", async () => {
            try {
                const parseData = JSON.parse(body);

                // Check if facultyid is provided
                if (!facultyid) {
                    res.statusCode = 400;
                    res.setHeader("Content-Type", "application/json");
                    res.end(JSON.stringify({
                        "error": "Faculty ID is required"
                    }));
                    return;
                }

                // Prepare update object with only provided fields
                const updateData = {};
                if (parseData.email) updateData.email = parseData.email;
                if (parseData.name) updateData.name = parseData.name;
                if (parseData.department) updateData.department = parseData.department;
                if (parseData.subjects) updateData.subjects = parseData.subjects;
                if (parseData.experienceYear !== undefined) updateData.experienceYear = parseData.experienceYear;

                // Check if at least one field is provided for update
                if (Object.keys(updateData).length === 0) {
                    res.statusCode = 400;
                    res.setHeader("Content-Type", "application/json");
                    res.end(JSON.stringify({
                        "error": "At least one field is required for update"
                    }));
                    return;
                }

                // Update the faculty member
                const updatedFaculty = await Faculty.findOneAndUpdate(
                    { facultyid: facultyid },
                    { $set: updateData },
                    { new: true, runValidators: true }
                );

                if (!updatedFaculty) {
                    res.statusCode = 404;
                    res.setHeader("Content-Type", "application/json");
                    res.end(JSON.stringify({
                        "error": "Faculty member not found"
                    }));
                    return;
                }

                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify({
                    "message": "Faculty contact details updated successfully",
                    "data": updatedFaculty
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

export { FacultyLogic };

