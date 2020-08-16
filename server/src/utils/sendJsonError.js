const sendJsonError = (message, stack) => {
  const jsonError = {
    error: {
      message,
      stack,
    }
  }

  return jsonError;
}

module.exports = sendJsonError;