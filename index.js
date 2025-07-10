const http = require("http");
const fs = require('fs')
const path = require('path')

const server = http.createServer((req, res) => {

  //dynamic file path. Equals the directory name, then pages, and then the request url (if not /)
    let filePath = path.join(__dirname, 
        'pages', 
        req.url === '/' ? 'index.html' : req.url
    );

    //gets the extension, and then creates a contentType to serve with writeHead
    let extname = path.extname(filePath)

    let contentType = 'text/html'

    switch (extname) {
        case ".js":
            contentType = "text/javascript";
            break;
        case ".css":
            contentType = "text/css";
            break;
        case ".json":
            contentType = "application/json";
            break;
        case ".png":
            contentType = "image/png";
            break;
        case ".jpg":
            contentType = "image/jpg";
            break;
    }

    //readfile takes a path to the content, then says what to do with an error, 
    // and then what to do with that content (display it in this case)

    fs.readFile(filePath, (err, content) => {
        if(err){
            if(err.code === 'ENOENT') {
                fs.readFile(path.join(__dirname, 'pages', '404.html'), (err, content) => {
                    res.writeHead(200, { 'contentType': 'text/html' })
                    res.end(content, 'utf8')
                })
            } else {
                res.writeHead(500)
                res.end(`Server error: ${error.code}`)
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType })
            res.end(content, 'utf8')
        }
    })
});

const PORT = process.env.port || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
