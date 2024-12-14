function pathHandler(req, res, next) {
       // LA IA ME HIZO SACAR ESTO PORQUE ME DABA ERROR, VER EL PROFE SI LO MODIFICO  console.log(error);
        const message = req.method + " " + req.url +  " - ENDPOINT NOT FOUND";
        const statusCode = 404;
        return res.status(statusCode).json({message});
    }

module.exports = pathHandler


