var http = require('http');
const fs=require("fs");
const { buffer } = require('stream/consumers');
http.createServer(function (req, res) {
 var url = req.url;
 const method=req.method;

if(url==="/"){

   fs.readFile("message.text",'utf8',(err,data)=>{
      console.log(data);
      res.write('<html>')
      res.write('<body><form action="/message" method="POST"><input type="text" name="message" /><button type="submit">save</button></form></body>')
      res.write('data:');
      res.write(`<body>${data}</body>`);
      res.write('</hml>')
        
     res.end()
   })
 
}


if(url==='/message' && method === 'POST'){
 
const body=[];
req.on('data',(chunk)=>{
   body.push(chunk);
});
req.on('end',()=>{
   const parsedbody=Buffer.concat(body).toString();
   const message=parsedbody.split('=')[1];
   fs.writeFileSync('message.text',message);
})




  res.statusCode=302;
  res.setHeader('Location','/');
  return res.end();
}

else if(url ==='/about') {
    res.write(' Welcome to about us page'); 
    res.end(); 
 } else if(url ==='/contact') {
    res.write(' Welcome to contact us page'); 
    res.end(); 
 } 
}).listen(8080);




