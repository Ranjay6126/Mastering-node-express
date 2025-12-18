

import express from 'express'

const app = express();

const PORT = 3000;


app.get('/', (req, res)=>{
  res.send("Hello I am express");
});

app.get('/about', (req,res)=>{
  res.send("I am about page ");
});

app.get('/query',(req, res)=>{

  const {name, age} = req.query; 
  res.send(`You are searching on me. Hey ${name}, your age is ${age}`);
  
});

app.listen(PORT ,()=>{
  console.log(`port is listing on ${PORT}`);
});