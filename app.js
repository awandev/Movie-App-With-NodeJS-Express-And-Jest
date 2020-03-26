const http = require('http')

const server = http.createServer((req, res) => {
    res.end('<h1>Your First simple web server</h1>');
});

server.listen(4000, () => {
    console.log('Server started at port 4000')
});