function logUrl() {
    return (req, res, next) => {
      console.log(req.originalUrl);
      next();
    }
}

module.exports = logUrl;