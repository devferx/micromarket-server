function errorHandler (err, req, res, next) {
  // console.log('errorHandler');
  res.status(500).json({
    message: err.message,
    stack: err.stack
  })
}

function boomErrorHandler (err, req, res, next) {
  if (err.isBoom) {
    const { output } = err
    return res.status(output.statusCode).json(output.payload)
  }

  next(err)
}

module.exports = { errorHandler, boomErrorHandler }
