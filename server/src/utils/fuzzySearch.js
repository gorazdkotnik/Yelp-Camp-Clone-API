const escapeRegex = (text) => {
  const regex = /[-[\]{}()*+?.,\\^$|#\s]/g;
  const result = text.replace(regex, '\\$&');
  return result;
};

module.exports = escapeRegex;
