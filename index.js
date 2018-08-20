const http = require('http'); //http.creatServer()

var server = http.createServer(function (request, response ) { //1.send a request. 2. want soethig back (response) response is what our files gonna be
    response.writeHead(200, {'Content-Type':'text/plain'}); //writing header informaton. text/plain can;t run js.just html and css
    response.end('This is running from a server') // end of response what we want.
}); //creat a server

server.listen(3000); //i'm gonna run my server port3000 in vagrat server type :3000 behind the vagrant server address
console.log("THIS SERVER IS RUNNING ON PORT 3000");
