// importing 
// adding type: "module" allows us to use this 
const express = require("express")
const mongoose = require("mongoose")
let Messages = require("./dbMessages.cjs")

//import {express} from "express"


//app config
const app = express()
const port = process.env.PORT || 9000


//middleware
app.use(express.json())


// DB config
const connection_url = ''

mongoose.connect(connection_url,{
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})

// ?????


// api routing (REST)
app.get("/", (req, res) => res.status(200).send("hello world"))


app.post("/messages/new", (req, res) => {
    const dbMessage = req.body
    Messages.create(dbMessage, (err, data) => {
      if(err){
          res.status(500).send(err)
      }  
      else{
          res.status(201).send(data)
      }
    })
})


//listener
app.listen(port, () => console.log("Listening on localhost:"+{port}))
