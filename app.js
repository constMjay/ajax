const express = require('express');
const path = require('path')
const mongoose = require('mongoose');
const app = express();
const port = 3000;

const homePage = require('./routes/create');
const contactPage = require('./routes/contact');
const aboutPage = require('./routes/about');
// Mongodb Connection
mongoose.connect('mongodb://localhost:27017/demo', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(console.log('Connected to database....'))
    .catch(err => console.log(console.log('Cant connect to database...', err)))


// Set View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'assets')))


//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }))


app.use(homePage)
app.use(contactPage)
app.use(aboutPage)

app.listen(port, (req, res) => {
    console.log(`Listening on port: ${port}`)
})