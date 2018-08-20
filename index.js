const http = require('http'); //http.creatServer()

var server = http.createServer(function (request, response ) { //1.send a request. 2. want soethig back (response) response is what our files gonna be
    var page;
    if (request.url === "/") {
        page = "home";
    } else if (request.url === "/contact") {
        page = "contact";
    }else if (request.url ==="/about") {
        page = "about";
    }

    response.writeHead(200, {'Content-Type':'text/html'}); //writing header informaton. text/plain can't run js.just html and css
    // response.end('This is running from a server') // end of response what we want.
    response.end(`
        <html>
            <head>
                <title>Node Server</title>
            </head>
            <body>
                <h1>${page}</h1>
                <p>${request.url}</p>
                <p>${request.method}</p>
            </body>
        </html>

        `);
}); //creat a server

server.listen(5000); //i'm gonna run my server port3000 in vagrat server type :3000 behind the vagrant server address
console.log("THIS SERVER IS RUNNING ON PORT 5000");
