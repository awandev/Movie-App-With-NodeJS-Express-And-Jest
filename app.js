const express = require('express')
const app = express();

app.get('/', (req, res) => {
    res.send('<a href="/contact">Contact Us</a><br /><a href="/about">About Us</a>')
});

app.get('/contact', (req, res) => {
    res.send('<h1>Contact Us Page</h1>')
});

app.get('/about', (req, res) => {
    res.send('<h1>About Us Page</h1>')
})

app.listen(3000, () => {
    console.log('Server started on port 3000')
})