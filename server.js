// Load modules.
var fs = require('fs');
var http = require('http');

// Handle GET requests.
function getHandler(req, res) {
    if(req.url === '/user') {
        readUser(function(user){
            res.end(user);            
        });
    } else {
        if (req.url === '/') {
            var index = fs.readFileSync('build/index.html', 'utf8');
            res.end(index);
        } else {
            var content = fs.readFileSync('build/'+req.url, 'utf8');
            res.end(content);
        }     
    }
}

// Handle POST requests.
function postHandler(req, res) {
    var body = '';
    req.on('data', function(data){
        body += data;
    });
    req.on('end', function(){
        fs.writeFileSync('user.json', body);
        res.end('success');
    });
}

// Server.
var app = http.createServer(function(req, res){
    
    // Serve users.
    switch(req.method) {
        case 'GET': getHandler(req, res);
            break;
        case 'POST': postHandler(req, res);
            break;
        default:
            res.end('invalid request');
    }   
}).listen(9999);

// Read file.
function readUser(callBack) {
    fs.readFile('user.json', 'utf8', function(err, data){
        if(err) {
            console.error(err);
        } else {
            callBack(data);       
        }
    });    
}

