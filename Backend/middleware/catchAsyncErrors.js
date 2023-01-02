let c = console.log;

module.exports = (theFunc) => (req, res, next) => {
    Promise.resolve(theFunc(req, res, next)).catch((err) => {
        c(err.message)
        next(err);
    })
}