/*import http from "http";
import fs from "fs";

// import { url } from "inspector";

import url  from "url";

const myServer = http.createServer((req, res)=>{

    const log = `${Date.now()} ${req,url} : New Request Received\n`;
    const myUrl = url.parse(req.url, true);
    console.log(myUrl);

    fs.appendFile("request.log", log, (err,data)=>{

        if(req.url === '/favicon.icon") return res.end();')

        switch(myUrl.pathname){
            case '/': res.end("Hello from the Home Page");
                break
            case '/about': res.end("Hello from the About Page");
                break;
            default: res.end("404 Page Not Found");
        }

        if(err){
            console.log("Unable to append to file");
        }
    })

    // console.log("New Request Received");
    // console.log(req);

    // res.end("Hello from the server side! All is well.");

})

myServer.listen(9000, ()=>{
    console.log(`Server started, is listening on port 9000`);
})

*/



import http from "http";
import fs from "fs";
import url from "url";

// Create HTTP server
const myServer = http.createServer((req, res) => {
  if (req.url === "/favicon.ico") return res.end(); // Ignore favicon

  const log = `${Date.now()}: ${req.url} - New Request Received\n`;

  const myUrl = new URL(req.url, `http://${req.headers.host}`);
  const pathname = myUrl.pathname;
  const query = Object.fromEntries(myUrl.searchParams);

  // Append log to file
  fs.appendFile("log.txt", log, (err) => {
    if (err) {
      console.error("Error writing to log file:", err);
      res.statusCode = 500;
      return res.end("Internal Server Error");
    }

    // Routing
    switch (pathname) {
      case "/":
        res.end("HomePage");
        break;

      case "/about": {
        const username = query.myname || "Guest";
        res.end(`Hi, ${username}`);
        break;
      }

      case "/search": {
        const search = query.search_query || "nothing";
        res.end(`Here are your results for "${search}"`);
        break;
      }

      default:
        res.end("404 Not Found");
        break;
    }
  });
});

// Start the server
myServer.listen(8000, () => console.log("Server started on port 8000"));
