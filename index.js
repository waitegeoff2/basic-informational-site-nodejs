const http = require("http");

//base url is "/". If a request is made, server will feed that.

const server = http.createServer((req, res) => {
  //to go to the website we are just LOADING the html files
  console.log(req.url);
});

const PORT = process.env.port || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
