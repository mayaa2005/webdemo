var http = require("http");
var fs = require("fs");
var extract = require('./extract');
var getMimeType = require('./getmimetype');
var wss = require('./websockets-server');

function handleError(err, res) {
  res.writeHead(404);
  res.end();
}

var server = http.createServer(function(req,res){
  console.log("Responding to a request");

  var filePath = extract(req.url);
  fs.readFile(filePath,function(err,data){
    if (err) {
      handleError(err,res);
      return;
    } else {
      res.setHeader('Content-Type',getMimeType(req.url));
      res.end(data);
    }
  });
});

server.listen(3000);
