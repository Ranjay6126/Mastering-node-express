/*
//Creating and Writing files Synchronous in Node.js
const fs = require("fs");

fs.writeFileSync(
  "./TextSync.text",
  "Hello, this is Synchronous ways to write inside the files!"
);



//Creating and Writing files Asynchronous in Node.js
fs.writeFile(
  "./TextAsync.text",
  "Hello, this is Asynchronous ways to write inside the files! these are built method in node js",
  (err) => {
    // if (err) throw err;
    console.log("File Created and Written Successfully!");
  }
); 

*/


//Reading files Synchronous in Node.js

// import fs from "fs";

// console.log("Reading File Synchronously:");
// const data = fs.readFileSync("./ContactInfo.txt", "utf8");
// console.log(data);
// console.log("Finished Reading File Synchronously!");



//Reading files Asynchronous in Node.js
console.log("Starting to read file asynchronously!!!!!");
import fs from "fs";
fs.readFile("./ContactInfo.txt", "utf8", (err, data) => {
  if (err) throw err;
  console.log(data);
} );
console.log("I won't for any one Finished initiating asynchronous file read!**##");



// Default thread pool size is 4//

import os from "os";
console.log("Number of CPU cores:", os.cpus().length);

// //Appending files Synchronous in Node.js

// import fs from "fs";

// fs.appendFileSync(
//   "./ContactInfo.txt",
//   `${Date.now()}\nThis is appended synchronous data inside the file!\n`
// );


// fs.copyFileSync(
//   "./ContactInfo.txt",
//   "./BackupContactInfo.txt"
// );


// fs.unlinkSync(
//   "./BackupContactInfo.txt"
// );

// console.log("File Appended, Copied and Deleted Successfully!");

// //Getting File Information synchronous in Node.js

// fs.stat("./ContactInfo.txt", (err, stats) => {
//   if (err) throw err;
//   console.log(stats);
// } );


// //mkdir -p NewFolder/SubFolder

// fs.mkdirSync(
//   "./NewFolder/SubFolder",
//   { recursive: true }
// );