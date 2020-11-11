// importing 
// adding type: "module" allows us to use this 
// instead of const express = require("express")
import express from "express"


//app config
const app = express()
const port = process.env.PORT || 9000


//middleware


// DB config


// ?????


// api routing (REST)
app.get("/", (req, res) => res.status(200).send("hello world"))


//listener
app.listen(port, () => console.log("Listening on localhost:${port}"))
