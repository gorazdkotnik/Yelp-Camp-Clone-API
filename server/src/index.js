// Modules
const express = require('express');
const morgan = require('morgan');

// App & Port
const app = express();
const port = process.env.PORT;

// Mongoose Connection
require('./db/mongoose');

// App Config
app.use(express.json());
app.use(morgan('dev'));

// Routers
app.use('/campgrounds', require('./routers/campgrounds'));
app.use('/campgrounds/:id/comments', require('./routers/comments'));

// Listener
app.listen(port, () => console.log(`Server listening on port ${port}....`));