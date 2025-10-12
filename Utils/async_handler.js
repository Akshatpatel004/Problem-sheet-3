const asyncHandler = (funtion) => {
    return (req, res) => {
        Promise.resolve(funtion(req, res)).catch((error) => {
            console.log(`Error occurs : - ${error.message.toString()}`);
            res.status(500).send(`Error occurs : - ${error.message.toString()}`);
        })
    }
}

export {asyncHandler};