// const express = require('express')

import express from "express";

// import db from "./db/mysql/index.js";


const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Test Running')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


app.post('/login', (req, res)=>{
  res("activate end-point login auth")
})
