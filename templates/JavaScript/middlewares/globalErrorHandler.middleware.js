const globalErrorHandlerMiddleware = (err, _req, res) => {
  res.status(err.statusCode || 500).json({
    statusCode: err.statusCode || 500,
    message: err.message || "Internal Server Error!",
    data: err.data || null,
  });
};

export default globalErrorHandlerMiddleware;
