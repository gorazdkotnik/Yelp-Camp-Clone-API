// App & Port
const app = require('./app');
const port = process.env.PORT;

// Listener
app.listen(port, () => {
  if (process.env.NODE_MODE === 'dev') {
    console.log(`Server listening on port ${port}....`);
  }
});
