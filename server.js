const mongoose = require('mongoose');
const http =require('http');
const url =require('url');

const student_route =require('./routes/student')
const port=3000

async function mong_connect() {
    let connect =  await mongoose.connect("mongodb://localhost:27017/BMCCA");
    if (connect) {
        console.log("MongoDB connect successfully");        
    }else{
        console.log("MongoDB connectiom fail"); 
    }
}
mong_connect()

http.createServer((req,res)=>{
    const path=url.parse(req.url,true).pathname;
    const query=url.parse(req.url,true).query;

    if (path==="/api" && req.method ==='GET') {
        res.end("this is home page")
    } else if (path.startsWith('/api/students')) {
        student_route(req,res)
    }
}).listen(port , ()=>{
    console.log(`your server is running in https://localhost:${port}`);
})