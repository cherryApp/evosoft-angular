// Load modules.
var fs = require('fs');
var http = require('http');

// Server.
var app = http.createServer(function(req, res){
    if(req.method === 'GET' && req.url === '/user') {
        readUser(function(user){
            res.end(user);            
        });
    } else {
        res.end('Hello');        
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

