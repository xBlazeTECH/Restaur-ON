// Make sure that we have everything we need!
var express = require('express');
var connect = require('connect');
var fs = require('fs');
var qs = require('querystring');

// Set Up Express Application!
var app = express();
app.use(connect.bodyParser());
app.use(express.cookieParser());
app.use(express.session({secret: "alphaalpha"}));
app.use(express.favicon(__dirname + "/system/content/img/favicon.ico"));

var getLogin = function(username) {
    var data = '';
	console.log('username: ' + username);
    data += '<script type="text/javascript">';
	if (username != null) {
	  data += 'document.getElementById("loggedout").style.visibility="hidden";';
	  data += 'document.getElementById("usernamedisp").href="/user";document.getElementById("usernamedisp").innerHTML="' + username + '";';
	} else {
	  data += 'document.getElementById("loggedin").style.visibility="hidden";';
	}
	data += '</script>';
	return data;
  };
  
  
var getProfile = function(wid) {
  var chunk = '';
  console.log('Retrieving information on: ' + wid);
  var file = __dirname + '/system/wids/' + wid + '.json';
  var data = fs.readFileSync(__dirname + '/system/wids/' + wid + '.json');
  return JSON.parse(data);
};
  
var getPage = function(pagename) {
    var data = '';
    var chunk = fs.readFileSync(__dirname + '/system/content/page/' + pagename + '.html').toString().split("\n");
	for(i in chunk) {
      data += chunk[i] + "\n";
    }
	return data;
  };

var getBlock = function(blockname) {
    var data = "";
    var chunk = fs.readFileSync(__dirname + '/system/content/blocks/' + blockname + '.html').toString().split("\n");
	for(i in chunk) {
      data += chunk[i] + "\n";
    }
	return data;
  };

var chgClass = function(id, classname) {
  var data = '<script type="text/javascript">function changeClass(){document.getElementById("' + id + '").className = "' + classname + '";};changeClass();</script>'
  return data;
  };
 
var chgText = function(id, text) {
  var data = '<script type="text/javascript">document.getElementById("' + id + '").innerHTML="' + text + '"';
  return data;
  };

app.get('/', function(req, res){
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write(getBlock('header'));
  res.write(getBlock('mainmenu'));
  res.write(getPage('homepage'));
  res.write(chgClass('home', 'active'));
  res.write(getLogin(req.session.wid));
  res.write(getBlock('footer'));
  res.end('</body></html>');
});

app.get('/waitstaff', function(req, res){
 /* if (req.query.t) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(getBlock('header'));
    res.write(getBlock('mainmenu'));
	res.write(getPage('waitstaff-table-select'));
	res.write(getLogin(req.session.wauth));
	res.write(getBlock('footer'));
    res.end('</body></html>');
  } else { */
    if (!req.session.wauth) {
      res.redirect('/waitstaff/login');
      res.end();
    } else {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(getBlock('header'));
      res.write(getBlock('mainmenu'));
	  res.write(getPage('waitstaff'));
	  res.write(getLogin(req.session.wauth));
	  res.write(getBlock('footer'));
      res.end('</body></html>');
    }
  //}
});

app.get('/waitstaff/login', function(req, res){
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write(getBlock('header'));
  res.write(getBlock('mainmenu'));
  res.write(getBlock('usermenu'));
  res.write(getPage('waitstaff-login'));
  res.write(chgClass('waitstaff', 'active'));
  res.write(getLogin(req.session.wauth));
  res.write(getBlock('footer'));
  res.end('</body></html>');
});

app.post('/waitstaff/login', function(req, res){
  var wid = req.body.wid;
  var profileLoc = __dirname + '/system/wids/' + wid + '.json';
  
  fs.readFile(profileLoc, 'utf8', function (err, data) {
    console.log('Waitstaff Authentication Recieved');
    console.log('Verifying WID: ' + req.body.wid);
    if (err) {
	  console.log(err);
      console.log('WID was not found!!');
      console.log('Booting the person back to login screen!');
	  req.session.authfail = 'true';
      res.redirect('/authfail');
    } else {
      console.log('Found a WID match, logging in!');
      var userInfo = JSON.parse(data);
	  req.session.wauth = req.body.wid;
      res.redirect('/waitstaff');
  }
 });
});

app.get('/authfail', function(req, res){
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write(getBlock('header'));    
  res.write(getBlock('mainmenu'));
  res.write(getBlock('usermenu'));
  res.write(getPage('waitstaff-login-failed'));
  res.write(chgClass('waitstaff', 'active'));
  res.write(getLogin(req.session.wauth));
  res.write(getBlock('footer'));
  res.end('</body></html>');
});

app.get('/kitchen', function(req, res){
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write(getBlock('header'));    
  res.write(getBlock('mainmenu'));
  res.write(getPage('kitchen'));
  res.write(chgClass('kitchen', 'active'));
  res.write(getBlock('footer'));
  res.end('</body></html>');
});

//BEGIN Administrator Login Functions

app.get('/admin', function(req, res){
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write(getBlock('header'));    
  res.write(getBlock('mainmenu'));
  res.write(getBlock('usermenu'));
  res.write(getPage('admin-login'));
  res.write(chgClass('admin', 'active'));
  res.write(getLogin(req.session.admusr));
  res.write(getBlock('footer'));
  res.end('</body></html>');
});

app.get('/logout', function(req, res){
  res.session.wid = null;
  res.session.admusr = null;
  res.redirect('/');
});

app.post('/admin', function(req, res){
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
	  res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(getBlock('header'));    
      res.write(getBlock('mainmenu'));
      res.write(getBlock('usermenu'));
      if (usernameIn == "root" && passwordIn == "pass") {
        res.write('<div class="span9" style="padding-top:70px;">Authentication Sucessful! You are now logged in as ' + req.body.user + '!');
      } else {
        res.write('<div class="span9" style="padding-top:70px;">Your Username or Password was Incorrect!');
      }
	  res.write(chgClass('admin', 'active'));
      res.write(getLogin(req.session.wid));
	  res.write(getBlock('footer'));
      res.end('</body></html>');
    }
  });
});

app.get('/tables/:tnum', function(req,res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write(getBlock('header'));    
  res.write(getBlock('mainmenu'));
  res.write('<div class="span9" style="padding-top:70px;">So you would like to see order details for table: ' + req.params.tnum);
  res.write(chgClass('waitstaff', 'active'));
  res.write(getLogin(req.session.wid));
  res.end('</body></html>');
});

//END Administrator Login Functions


//BEGIN Real File Readouts

app.get('/css', function(req, res){
  var filename = req.query.q;
  var theme = req.query.theme;
  var array = fs.readFileSync(__dirname + '/system/content/themes/' + theme + '/' + filename + '.css').toString().split("\n");
  for(i in array) {
      res.write(array[i]);
  }
  res.end();
});

app.get('/img', function(req, res){
  var filename = req.query.q;
  var extention = req.query.ext;
  var image = fs.readFileSync(__dirname + '/system/content/img/' + filename + '.' + extention);
  res.write(image);
  res.end();
});

app.get('/js', function(req, res){
  var filename = req.query.q;
  var array = fs.readFileSync(__dirname + '/system/content/js/' + filename + '.js').toString().split("\n");
  for(i in array) {
      res.write(array[i]);
  }
  res.end();
});

app.get('/file', function(req, res){
  var filename = req.query.q;
  var extention = req.query.ext;
  var array = fs.readFileSync(__dirname + '/system/content/files/' + filename + '.' + extention).toString().split("\n");
  for(i in array) {
      res.write(array[i]);
  }
  res.end();
});

//END Real File Readouts.

/* This is my way of using query. It is for my reference.
app.get('/hi', function(req, res){
  var body = req.query.body;
  res.end(body);
});
*/

app.listen(3000);
console.log('Listening on port 3000');
