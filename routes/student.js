import Students from '../schema/student';

// const faculty = require('../schema/faculty');
// const courses = require('../schema/courses');
// const departments = require('../schema/departments');
// const library = require('../schema/library');

import url from 'url';
// const { json } = require('stream/consumers');

async function student_route(req, res) {
    const path = url.parse(req.url, true).pathname;
    const querry = url.parse(req.url, true).query;
    try {
        if (path === '/api/students' && req.method === 'GET') {
            res.end(JSON.stringify(await Students.find()));

        } else if (path === '/api/students/create' && req.method === 'POST') {
            const stud = await Students.findOne({ email: req.body.email },{ studentid: req.body.studentid });
            if (stud) {
                res.end("this student id or email already existing")
            } else {
                stud=await Students.create({
                    studentid: req.body.studentid,
                    name: req.body.name,
                    email: req.body.email,
                    marks: req.body.marks,
                    courseEnrolled: req.body.courseEnrolled,
                    admissionDate: req.body.admissionDate
                })
                res.end("Data inserted successfully")
            }
        } else if (path === '/api/students') {
            res.end("hello word")
        }
    } catch (error) {

    }
}

module.exports = student_route;