function pathHandler(req, res, next) {
        console.log(error);
        const message = req.method + " " + req.url +  " - ENDPOINT NOT FOUND";
        const statusCode = 404;
        return res.status(statusCode).json({message});
    }

module.exports = pathHandler