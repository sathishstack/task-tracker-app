const errorHandler = (err, req, res, next) => {
    const statusCode = err.status || (res.statusCode === 200 ? 500 : res.statusCode);
    res.status(statusCode);

    console.error(err.stack); // Log the stack trace for debugging

    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === "production" ? null : err.stack,
    });
};

module.exports = errorHandler;
