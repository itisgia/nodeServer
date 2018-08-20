const http = require('http');
const fs = require('fs');
const path = require('path');


var server = http.createServer(function(request, response){
    console.log(`${request.method} request for ${request.url}`);
    var page;

    if(request.url === "/" || request.url === "home" || request.url === "index"){
        page = "home";
        fs.readFile('./public/index.html', 'UTF-8', function(error, contents){
            if(error){
                console.log("error, something went wrong");
            } else {
                response.writeHead(200, {'Content-Type':'text/html'});
                response.end(contents);
            }
        });
    } else if(request.url.match(/.css$/)){
        var cssPath = path.join(__dirname, 'public', request.url);
        var fileStream = fs.createReadStream(cssPath, 'UTF-8');
        response.writeHead(200, {'Content-Type': 'text/css'});
        fileStream.pipe(response);
    }
    // else if (request.url === "/contact") {
    //     page = "contact";
    // }else if (request.url ==="/about") {
    //     page = "about";
    // }

    // response.writeHead(200, {'Content-Type':'text/html'}); //writing header informaton. text/plain can't run js.just html and css
    // // response.end('This is running from a server') // end of response what we want.
    // response.end(`
    //     <html>
    //         <head>
    //             <title>Node Server</title>
    //         </head>
    //         <body>
    //             <h1>${page}</h1>
    //             <p>${request.url}</p>
    //             <p>${request.method}</p>
    //         </body>
    //     </html>
    //
    //     `);
}); //creat a server

server.listen(5000); //i'm gonna run my server port3000 in vagrat server type :3000 behind the vagrant server address
console.log("THIS SERVER IS RUNNING ON PORT 5000");
