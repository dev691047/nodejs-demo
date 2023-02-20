var http = require('http');

http.createServer(function (req, res) {
  res.write('kumar dev');
  res.end(); 
}).listen(8080);