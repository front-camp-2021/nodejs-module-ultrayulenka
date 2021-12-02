const http = require("http");

const port = 5000;

const server = http.createServer((req, res) => {
    const url = req.url;

    if (url === "/") {
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/html");
        res.write('<h1>Greeting from server!</h1>')
        return res.end();
    }
    
    if (url === "/data") {
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/html");
        res.write('<p>Welcome to data path</p>')
        return res.end();
    }
});


server.listen(port, () => {
    console.log(`Server is running at port ${port}`);
});