const app = require('express')();
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport');
const database = require('./config/database');


// Routes
const basicRoutes = require('./routes/basicRoutes');


// Database Setup
mongoose.connect(database.database, { useNewUrlParser: true }).then(
    () => {
        console.log("Mongodb is running.....");
    },
    err => {
        console.log("Error while connecting to the MongoDB", err);
    }
);

// PORT
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(cors());

app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

// Routes
app.use('/', basicRoutes);

// Starting Server
app.listen(port, () => {
    console.log('Server is running at port: ', port);
});