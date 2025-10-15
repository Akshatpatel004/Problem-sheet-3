import Library from '../Model/library.js';
import mongoose from "mongoose";


const LibraryLogic = {
    insertLibrary: async (req, res) => {
        let body = "";

        req.on('data', (chunks) => {
            body += chunks.toString();
        });

        req.on("end", async () => {
            try {
                // const req.body = JSON.parse(body);
                if (!req.body.bookId || !req.body.title || !req.body.author || !req.body.category || !req.body.isAvailable || !req.body.issuedTo || !req.body.issueDate) {
                    res.statusCode = 400;
                    res.setHeader("Content-Type", "application/json");
                    res.end(JSON.stringify({
                        "error": "missing key value"
                    }));
                    return;
                }
                const newlibrary = new Library({
                    bookId: req.body.bookId,
                    title: req.body.title,
                    author: req.body.author,
                    category: req.body.category,
                    isAvailable: req.body.isAvailable,
                    issuedTo: req.body.issuedTo,
                    issueDate: req.body.issueDate,
                });

                const librarySaved = await newlibrary.save();

                // const newlibrary = new Library(req.body);
                // const librarySaved = await newlibrary.save();
                res.statusCode = 201;
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify({
                    message: "library created successfully",
                    data: librarySaved
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


    FindCategory: async (req, res, cat) => {
        try {
            const isAvailable = await Library.find({ isAvailable: true })
            const find = await isAvailable.find({ category: cat })
            res.statusCode = 201;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({
                data: find
            }));
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
            const find = await Library.find()
            res.statusCode = 201;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({
                message: "All books",
                data: find
            }));
        } catch (error) {
            res.statusCode = 400;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({
                error: error.message
            }));
        }
    },


    DeleteCollection: async (req, res, col_name) => {
        try {
            await mongoose.connection.db.dropCollection(col_name)
            res.statusCode = 201;
            res.setHeader("Content-Type", "application/json");
            res.end(col_name + " COllection has been drop successfully")
        } catch (error) {
            res.statusCode = 400;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({
                error: error.message
            }));
        }
    }
}

export { LibraryLogic };