const express = require("express");
const app = express();
const fs = require("fs");

const port = 5005;

app.get("/", (req, res) => {
    res.setHeader("Content-Type", "text/html");
    res.status(200).write('<h1>Greeting from server!</h1>')
});

app.get("/data", (req, res) => {
    res.setHeader("Content-Type", "text/html");
    res.status(200).write('<p>Welcome to data path</p>')
});

app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
});

function createFile(fd, defaultText = '') {
    return new Promise(function(resolve, reject) {
        fs.writeFile(fd, defaultText, (err) => {
            if (err) {
                reject(err)
            } else {
                console.log('File saved');
                resolve();
            }
        });
    }).then(() => {
        for(let i = 1; i <= 10; i++) {
            const text = i < 10? `${i}\n` : `${i}`;
            fs.appendFile(fd, text, (err) => {
                if (err) throw err;
            })
        }
    })
}

function readAndDeleteFile(name) {
    const fd = __dirname + `/text/${name}`;
    return new Promise(function(resolve, reject) {
        fs.readFile(fd, (err, data) => {
            if(err)  reject(err);
            console.log(String(data));
            resolve();
        })
    }).then(() => {
        fs.unlink(fd, err => {
            if (err) throw err;
            console.log('File deleted!');
        })
    })
}

createFile(__dirname + '/text/numbers.txt').then(() => {
    readAndDeleteFile('numbers.txt');
})

