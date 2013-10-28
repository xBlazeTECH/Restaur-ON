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
  var usernameIn = req.body.user;
  var passwordIn = req.body.pass;
  
  // The following line is used for debugging purposes only!
  console.log('Username: ' + usernameIn + ' Password: ' + passwordIn);
  var adminLoc = __dirname + '/profiles/admin/' + usernameIn + '.json';
  var waitstaffLoc = __dirname + '/profiles/waitstaff/' + usernameIn + '.json';
  var kitchenLoc = __dirname + '/profiles/kitchen/' + usernameIn + '.json';
  var managerLoc = __dirname + '/profiles/manager/' + usernameIn + '.json';
  
 /*
  function isAdmin(user) {
    console.log('Checking to see if user is on the Admin list...!);
  }

  function isWaitstaff(user) {
    console.log('Checking to see if user is on the Waitstaff list...');
  }

  function isKitchen(user) {
    console.log('Checking to see if user is on the Kitchen list...');
  }

  function isManager(user) {
    console.log('Checking to see if user is on the Manager list...');
  }
*/

  fs.readFile(adminLoc, 'utf8', function (err, data) {
    console.log('System is now looking into ' + usernameIn + '...' );
    if (err) {
      console.log('User was not found in the Admin List');
      console.log('Hang on, not working!');
    } else {
      console.log('WE HAVE AN ADMIN!');
      var userInfo = JSON.parse(data);
    }
    authenticate();
  });

  function authenticate() {   
    
    if (usernameIn == "root" && passwordIn == "pass") {
      res.send('Authentication Sucessful! You are now logged in as ' + req.body.user + '!');
    } else {
      res.send('Invalid Credentials!');
    }
  }

  function authFail() {

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
