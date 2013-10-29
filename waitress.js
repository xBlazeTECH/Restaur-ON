// Make sure that we have everything we need!
var connect = require('connect');
var fs = require('fs');
var qs = require('querystring');
var express = require('express');

// Set Up Express Application!
var app = express();
app.use(connect.bodyParser());
app.use(express.cookieParser());
//app.use(express.session());
app.use(express.session({secret: "alphaalpha"}));

// Define Variable to be used Later!


app.get('/', function(req, res){
  res.writeHead(200, {'Content-Type': 'text/html'});
  
  var array = fs.readFileSync(__dirname + '/system/content/blocks/header.html').toString().split("\n");
  for(i in array) {
      res.write(array[i]);
  }
  
  var array = fs.readFileSync(__dirname + '/system/content/blocks/mainmenu.html').toString().split("\n");
  for(i in array) {
      res.write(array[i]);
  }
  
  var array = fs.readFileSync(__dirname + '/system/content/blocks/sidemenu.html').toString().split("\n");
  for(i in array) {
      res.write(array[i]);
  }
  
  var array = fs.readFileSync(__dirname + '/system/content/page/homepage.html').toString().split("\n");
  for(i in array) {
      res.write(array[i]);
  }
  
  res.end('</body></html>');
}
});

app.get('/waitstaff', function(req, res){
  var path = __dirname + '/system/content/dashboard/waitstaff.json';
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
  var path = __dirname + '/system/content/dashboard/kitchen.json';
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
  var path = __dirname + '/system/content/dashboard/admin.json';
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

app.get('/login', function(req, res){
  /*
  var path = __dirname + '/system/content/util/login.json';
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
  */
  res.sendfile(__dirname + '/system/content/util/login.html');
});

app.post('/logout', function(req, res){
  res.clearCookie('loggedin');
});

app.post('/login', function(req, res){
  var usernameIn = req.body.user;
  var passwordIn = req.body.pass;
  var profileLoc = __dirname + '/system/users/' + usernameIn + '.json';
  
  fs.readFile(profileLoc, 'utf8', function (err, data) {
    console.log('System is now looking for ' + usernameIn + '...');
    if (err) {
      console.log('User file not found for ' + usernameIn + '!');
      console.log('Displaying Authentication Failure Notice!');
      res.send('Your Username or Password was Incorrect!');
    } else {
      console.log('We found a profile for the user!');
      var userInfo = JSON.parse(data);
      authenticate();
    }
  });
  
  // The following line is used for debugging purposes only!
  console.log('Username: ' + usernameIn + ' Password: ' + passwordIn);

  function authenticate() {   
    
    if (usernameIn == "root" && passwordIn == "pass") {
      res.send('Authentication Sucessful! You are now logged in as ' + req.body.user + '!');
    } else {
      res.send('Your Username or Password was Incorrect!')
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
