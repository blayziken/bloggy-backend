const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', err => {
    console.log('UNCAUGHT EXCEPTION, Shutting down!..')
    console.log(err.name, err.message);

    process.exit(1);
});

dotenv.config({ path: './config.env' });

const app = require('./app');

// const DB = 'mongodb://localhost:27017/blog-db'; // local DB connection

// MONGO DB ATLAS CONNECTION STRING
const DB = "mongodb+srv://blogUser:DhiFoe3mjfqGLLhH@cluster0.9tzrq.mongodb.net/AppDB?retryWrites=true&w=majority"

mongoose
    .connect(DB, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    })
    .then(() => console.log('DB connection successful!'));

const port = process.env.PORT || 8000;

const server = app.listen(port, () => {
    console.log(`Server running on port 8000...`);
});


process.on('unhandledRejection', err => {
    console.log('UNHANDLED REJECTION, Shutting down!..')
    console.log(err.name, err.message);

    server.close(() => {
        process.exit(1);
    });
});
