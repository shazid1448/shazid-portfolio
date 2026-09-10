/**
 * Global Error Handler: Handles and formats unhandled backend API errors
 */

const errorHandler = (err, req, res, next) => {
  console.error('[SERVER ERROR]:', err.stack || err.message);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error. Please try again later.'
  });
};

module.exports = errorHandler;
