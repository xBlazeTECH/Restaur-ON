// Define Requires
var fs = require('fs');
var http = require('http');
var qs = require('querystring');

// Configuration Stuff
var waitdashIP = '0.0.0.0';
var admindashIP = '0.0.0.0';

var serverHOST = '0.0.0.0';
var waitdashPORT = 12301;
var admindashPORT = 12302;
var kitchendashPORT = 12303;

/* Depreciated (Replaced by Individual Pages.)
var pageTitle = out.title;
var pageHeader = out.header;
var pageContent = out.content;
*/

// Begin Creation of the Waitstaff Dashboard
console.log('Attempting to start up the Waitstaff Dashboard');
http.createServer(function (req, res) {
   var path = __dirname + '/content/dashboard/waitstaff.json';
   fs.readFile(path, 'utf8', function (err, data) {
      if (err) {
         console.log('**ERROR: There was an error while loading homepage content!\n' + err);
         return;
      }
      info = null;
      info = JSON.parse(data);
      console.log('Homepage Loaded Sucessfully with');
      console.dir(info);
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
}).listen(waitdashPORT, serverHOST);
console.log('Waitstaff Dashboard Started Sucessfully!');
//console.log('Waitstaff Dashboard Started at http://' + waitdashIP + ':' + waitdashPORT + '/');


// Begin the creation of the Administrative Dashboard
console.log('Attempting to start up the Administrator Dashboard.');

http.createServer(function (req, res) {
   var path = __dirname + '/content/dashboard/admin.json';
   fs.readFile(path, 'utf8', function (err, data) {
      if (err) {
         console.log('**ERROR: There was an error while loading homepage content!\n' + err);
         return;
      }
      info = null;
      info = JSON.parse(data);
      console.log('Homepage Loaded Sucessfully with');
      console.dir(info);
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
}).listen(admindashPORT, serverHOST);

console.log('Administrative Dashboard Started Sucessfully.');

// Begin the creation of the Kitchen Dashboard
console.log('Attempting to start up the Kitchen Dashboard.');

http.createServer(function (req, res) {
   var path = __dirname + '/content/dashboard/kitchen.json';
   fs.readFile(path, 'utf8', function (err, data) {
      if (err) {
         console.log('**ERROR: There was an error while loading homepage content!\n' + err);
         return;
      }
      info = null;
      info = JSON.parse(data);
      console.log('Homepage Loaded Sucessfully with');
      console.dir(info);
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
}).listen(kitchendashPORT, serverHOST);
console.log('Kitchen Dashboard Started Sucessfully');
