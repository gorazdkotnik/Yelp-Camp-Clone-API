// Modules
const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');

// App
const app = express();

// Mongoose Connection
require('./db/mongoose');

// Static Folder
app.use(express.static(path.join(__dirname, '../public')));

// App Config
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

if (process.env.NODE_MODE === 'dev') {
  const morgan = require('morgan');
  app.use(morgan('dev'));
}

// Routers
app.use('/campgrounds', require('./routers/campgrounds'));
app.use('/campgrounds/:id/comments', require('./routers/comments'));
app.use('/users', require('./routers/users'));

// Exports
module.exports = app;
