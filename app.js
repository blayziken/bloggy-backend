// const path = require('path');
const express = require('express');
const userRouter = require('./routes/userRoutes');
const homeRouter = require('./routes/home');
const profileRouter = require('./routes/profileRoutes');
const blogPostRouter = require('./routes/blogPostRoutes');
const AppError = require('./utils/appError')

const app = express();

// 1) GLOBAL MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // middleware used to parse data coming from a FORM
app.use("/uploads", express.static("uploads"));

// 3) ROUTES
app.use('/', homeRouter);
app.use('/users', userRouter);
app.use('/profiles', profileRouter);
app.use('/posts', blogPostRouter);

app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

module.exports = app;
