const mongoose = require('mongoose');

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
