/**
 * * Modules
 * * Imports
 */
const mongoose = require('mongoose');

/**
 * * Connecting To Database
 */
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    if (process.env.NODE_MODE === 'dev') {
      console.log('Connected to MongoDB...');
    }
  })
  .catch((error) => console.log(error));
