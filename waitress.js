var fs = require('fs');
var qs = require('querystring');
var express = require('express');
var app = express();

app.get('/', function(req, res){
  var path = __dirname + '/content/dashboard/homepage.json';
    fs.readFile(path, 'utf8', function (err, data) {
    if (err) {
      console.log('**ERROR: There was an error while loading homepage content!\n' + err);
      return;
    }
    info = null;
    info = JSON.parse(data);
    processNode();
   });
  function processNode() {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<html><head><title>' + info.title + '</title></head>');
    res.write('<body>');
    res.write('<h1>' + info.header + '</h1>');
    res.write(info.content);
    res.end('</body></html>');
  }
});

app.get('/hi', function(req, res){
  var body = 'Bye There!';
  res.end(body);
});

app.listen(3000);
console.log('Listening on port 3000');
