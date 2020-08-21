// App & Port
const app = require('./app');
const port = process.env.PORT;

// Listener
app.listen(port, () => console.log(`Server listening on port ${port}....`));
