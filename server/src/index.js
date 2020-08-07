// Modules
const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');

// App & Port
const app = express();
const port = process.env.PORT;

// Mongoose Connection
require('./db/mongoose');

// App Config
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(morgan('dev'));

// Routers
app.use('/campgrounds', require('./routers/campgrounds'));
app.use('/campgrounds/:id/comments', require('./routers/comments'));
app.use('/users', require('./routers/users'));

// Listener
app.listen(port, () => console.log(`Server listening on port ${port}....`));
