module.exports = (data, statusCode, res) => {
  return res.status(statusCode).json({
    status: "success",
    data,
  });
};
