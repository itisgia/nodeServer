const http = require('http'); //http.creatServer()

var server = http.createServer(function (request, response ) { //1.send a request. 2. want soethig back (response) response is what our files gonna be
    var page;
    var image
    if (request.url === "/") {
        page = "Spring";
        image = "img/spring.jpg"
    } else if (request.url === "/summer") {
        page = "Summer";
        image = "/img/summer.jpg"
    }else if (request.url ==="/fall") {
        page = "Fall";
        image = "pub/img/fall.jpg"
    }else if (request.url ==="/winter") {
        page = "Winter";
        image = "pub/img/winter.jpg"
    }

    response.writeHead(200, {'Content-Type':'text/html'}, {'Content-type': 'image/jpg'}); //writing header informaton. text/plain can't run js.just html and css
    // response.end('This is running from a server') // end of response what we want.
    response.end(`
        <html>
            <head>
                <title>Node Server</title>
                <style>
                    body {background-color: pink;}
                    img {
                        width: 200px;
                        height: 400px;
                    }
                </style>
            </head>
            <body>
                <h1>${page}</h1>
                <img src = "${image}">
                <p>${request.url}</p>
                <p>${request.method}</p>
            </body>
        </html>

        `);
}); //creat a server

server.listen(5000); //i'm gonna run my server port3000 in vagrat server type :3000 behind the vagrant server address
console.log("THIS SERVER IS RUNNING ON PORT 5000");
