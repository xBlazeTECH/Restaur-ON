var connect = require('connect');
var fs = require('fs');
var qs = require('querystring');
var express = require('express');
var app = express();
app.use(connect.bodyParser());

//Define Variable to be used Later!


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

app.get('/waitstaff', function(req, res){
  var path = __dirname + '/content/dashboard/waitstaff.json';
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

app.get('/kitchen', function(req, res){
  var path = __dirname + '/content/dashboard/kitchen.json';
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

app.get('/admin', function(req, res){
  var path = __dirname + '/content/dashboard/admin.json';
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

app.get('/auth', function(req, res){
  var path = __dirname + '/content/util/login.json';
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

app.post('/auth', function(req, res){
  var username = req.body.user;
  var password = req.body.pass;
  
  
  // The following line is used for debugging purposes only!
  console.log('Username: ' + username + ' Password: ' + password);
  var adminLoc = __dirname + '/profiles/admin.json';
  var waitstaffLoc = __dirname + '/profiles/waitstaff.json';
  var kitchenLoc = __dirname + '/profiles/kitchen.json';
  var managerLoc = __dirname + '/profiles/manager.json';
  
  fs.readFile(adminLoc, 'utf8', function (err, data) {
    if (err) {
      console.log('**ERROR: There was an error while loading the Admin Profiles!\n' + err);
      return;
    }
    info = null;
    info = JSON.parse(data);
    processAuth();
  });
  
  fs.readFile(waitstaffLoc, 'utf8', function (err, data) {
    if (err) {
      console.log('**ERROR: There was an error while loading the Waitstaff Profiles!\n' + err);
      return;
    }
    info = null;
    info = JSON.parse(data);
    processAuth();
  });
  
  fs.readFile(kitchenLoc, 'utf8', function (err, data) {
    if (err) {
      console.log('**ERROR: There was an error while loading the Kitchen Profiles!\n' + err);
      return;
    }
    info = null;
    info = JSON.parse(data);
    processAuth();
  });
  
  
  fs.readFile(managerLoc, 'utf8', function (err, data) {
    if (err) {
      console.log('**ERROR: There was an error while loading the Manager Profiles!\n' + err);
      return;
    }
    info = null;
    info = JSON.parse(data);
    processAuth();
  });
  function processAuth() {
    if (req.body.user == "user" && req.body.pass == "pass") {
      res.send('Authentication Sucessful! You are now logged in as ' + req.body.user + '!');
    } else {
      res.send('Invalid Credentials!');
    }
  }
});

/* This is my way of using query. It is for my reference.
app.get('/hi', function(req, res){
  var body = req.query.body;
  res.end(body);
});
*/

app.listen(3000);
console.log('Listening on port 3000');
