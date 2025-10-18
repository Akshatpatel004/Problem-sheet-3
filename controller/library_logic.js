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
                const parseData = JSON.parse(body);

                if (!parseData.bookId || !parseData.title || !parseData.author ||
                    !parseData.category || !parseData.isAvailable || !parseData.issuedTo ||
                    !parseData.issueDate) {
                    res.statusCode = 400;
                    res.setHeader("Content-Type", "application/json");
                    res.end(JSON.stringify({
                        "error": "missing key value",
                        "missing": Object.keys({
                            bookId: parseData.bookId,
                            title: parseData.title,
                            author: parseData.author,
                            category: parseData.category,
                            isAvailable: parseData.isAvailable,
                            issuedTo: parseData.issuedTo,
                            issueDate: parseData.issueDate,
                        }).filter(key => !parseData[key])
                    }));
                    return;
                }
                const newlibrary = new Library({
                    bookId: parseData.bookId,
                    title: parseData.title,
                    author: parseData.author,
                    category: parseData.category,
                    isAvailable: parseData.isAvailable,
                    issuedTo: parseData.issuedTo,
                    issueDate: parseData.issueDate,
                });

                const librarySaved = await newlibrary.save();


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
            const find = await Library.find({ category: cat, isAvailable: true });
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


    DeleteCollection: async (req, res) => {
        try {
            const newlibrary = await Library.deleteMany({ issueDate: { $lt: new Date('2025-01-01') } });
            res.statusCode = 201;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({
                data: newlibrary
            }));
        } catch (error) {
            res.statusCode = 400;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({
                error: error.message
            }));
        }
    },

    issuebook: async (req, res) => {
        try {
            const find = await Library.find().sort({ issueDate: -1 }).limit(3)
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

    drop: async (req, res) => {
        mongoose.connection.db.dropCollection("libraries")
        res.end("drop successfully")
    }
}

export { LibraryLogic };