const asyncTryCatch = async (fn) => {
    return async (req, res) => {
        try {
            await fn(req, res);
        } catch (error) {
            console.log(`Server Error occurs : - ${error.message.toString()}`);
            res.status(500).send(`Server Error occurs : - ${error.message.toString()}`);    
        }
    }
}

export {asyncTryCatch};