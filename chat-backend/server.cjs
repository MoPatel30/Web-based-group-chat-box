// importing 
// adding type: "module" allows us to use this 
const express = require("express")
const mongoose = require("mongoose")
let Messages = require("./dbMessages.cjs")
let Rooms = require("./dbRooms.cjs")
const Pusher = require("pusher")
const cors = require("cors")
var bodyParser = require('body-parser'); // npm i body-parser
require("dotenv").config()
//import {express} from "express"


//app config
const app = express()
const port = process.env.PORT || 9000


const pusher = new Pusher({
    appId: process.env.PUSHER_appId,
    key: process.env.PUSHER_key,
    secret: process.env.PUSHER_secret,
    cluster: process.env.PUSHER_cluster,
    useTLS: true
});


app.use(express.json())
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

/* cors replaces this
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Headers", "*")
    next()
})
*/

// DB config
const connection_url = process.env.DB_URL

mongoose.connect(connection_url,{
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})

// ?????


const db = mongoose.connection

db.once("open", () =>{
    console.log("DB connected")

    const msgCollection = db.collection("messagecontents")
    const changeStream = msgCollection.watch()


    changeStream.on("change", (change) => {
        console.log(change)

        if(change.operationType === "insert"){
            const messageDetails = change.fullDocument
            pusher.trigger("messages", "inserted",
                {
                    message: messageDetails.message,
                    name: messageDetails.name, 
                    timestamp: messageDetails.timestamp,
                    received: messageDetails.received
                }
            )
        }
        else{
            console.log("Error triggering pusher")
        }
    })
})


// api routing (REST)
app.get("/", (req, res) => res.status(200).send("hello world"))


app.get("/rooms", (req, res) => {
    console.log("got rooms")
    Rooms.find((err, data) => {
        if (err){
            res.status(500).send(err)
        }
        else{
            res.status(201).send(data)
        }
    })
})

app.post("/rooms", (req, res) => {
    const dbRoom = req.body
    console.log("added rooms")
    Rooms.create( dbRoom, (err, data) => {
        if (err){
            res.status(500).send(err)
        }
        else{
            res.status(201).send(data)
        }
    })
})

app.post("/rooms/${curRoomID}/messages`")
    

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


app.get("/messages/sync", (req, res) => {
    Messages.find((err, data) => {
        if (err){
            res.status(500).send(err)
        }
        else{
            res.status(200).send(data)
        }
    })
})


//listener
app.listen(port, () => console.log("Listening on localhost:"+{port}))
