var express = require("express");
var path = require("path");
const app =  express();

app.get("**/mocks/:key1/:key2/index.json", (req, res)=>{
 res.sendFile(path.resolve(__dirname, "../mocks/", req.params.key1 , req.params.key2 , "./index.json"));
});

app.get("**/mocks/:key/index.json", (req, res)=>{
 res.sendFile(path.resolve(__dirname, "../mocks/", req.params.key, "./index.json"));
});

app.post("**/mocks/:key/index.json", (req, res)=>{
 res.sendFile(path.resolve(__dirname, "../mocks/", req.params.key, "./index.json"));
});


app.use("**m2u/app/**/static", express.static("src/assets"));

app.get("**/main.js", (req, res)=>{
 res.sendFile(path.resolve(__dirname,"../bin/main.js"));
});

app.get("**/static/:key", (req, res)=>{
 /*if (req.params.key.match(/$json$/)){
   res.sendFile(path.resolve(__dirname, req.params.key));
 }*/
 res.sendFile(path.resolve(__dirname,"../bin/", req.params.key));
});

app.get("**/css/:key", function (req, res) {
 res.sendFile(path.resolve(__dirname, "../src/assets/css/", req.params.key));
});

app.get("/m2u/app**", (req, res)=>{
 res.sendFile(path.resolve(__dirname,"../app.html"));
});

app.get("/maybankm2u/", (req, res)=>{
 res.sendFile(path.resolve(__dirname,"../index.html"));
});

app.listen(8080, (err)=>{
 if (err) {
 }
 console.log("app running on port ", 8080);
});