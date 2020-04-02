const express = require('express')
const app = express()

const path = require('path')
const dotenv = require('dotenv')
const mongoose = require('mongoose')

// router
const emproyeeRoutes = require('./routes/employees.route')



dotenv.config({path: './config.env'})

mongoose.connect(process.env.DATABASE_LOCAL, {
    userNewUrlParser: true,
    useUnifiedTopology : true,
    useCreateIndex: true
})


app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(emproyeeRoutes);

const port = process.env.PORT;
app.listen(3000, () => {
    console.log('Server is started.')
})