const http = require('http');
const fs = require('fs');
const path = require('path');
const data = require('./data/products');
const qs = require('querystring')


var server = http.createServer(function(request, response){
    console.log(`${request.method} request for ${request.url}`);
    var page;

    if (request.method ==="GET") {
        if(request.url === "/" || request.url === "home" || request.url === "index" || request.url === "contact" ){
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
        } else if(request.url.match(/.js$/)){
            var javaPath = path.join(__dirname, 'public', request.url);
            var fileStream = fs.createReadStream(javaPath, 'UTF-8');
            response.writeHead(200, {'Content-Type': 'text/javascript'});
            fileStream.pipe(response);
        } else if(request.url.match(/.jpg$/)){
    		var imagePath = path.join(__dirname, 'public', request.url);
    		var imageStream = fs.createReadStream(imagePath);
    		response.writeHead(200, {'Content-Type':'image/jpeg'});
    		imageStream.pipe(response);
    	} else if (request.url === '/allProducts') {
            response.writeHead(200, {'Content-Type':'text/json'});
            response.end(JSON.stringify(data));
        } else if (request.url === '/inStock') {
            //if i type this url,
            instock(response);

        } else if (request.url === '/outofStock') {
            outofStock(response);
        }
    } else if (request.method === "POST") {
        if (request.url === './formSubmit' ) {
            // console.log(request);
            // response.writeHead(200, {'Content-Type':'text/html'});
            // response.end(request);
            var body = '';
            request.on('data', function (data) {
                body += data; // eah time around it;s gonna give chunk of datas into body
            })

            request.on('end', function () {
                var formData = qs.parse(body);
                console.log(body);
            })
        }

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


function instock(response) {
    //data ia json data
    //data filter is kinda loopfillter out data.
    //item is going to change whick iteration
    var stock = data.filter(function (item) {
        return item.inStock === true;
        //retyribg all item whichis tryw
    });
    response.end(JSON.stringify(stock));
}

function outofStock(response) {
    var stockOut = data.filter(function (check) {
        return check.inStock === false;
    });
    response.end(JSON.stringify(stockOut));
}
