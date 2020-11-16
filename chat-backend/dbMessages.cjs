const mongoose = require("mongoose")

const groupchatSchema = mongoose.Schema({
    message: String,
    name: String,
    timestamp: String,
    received: Boolean
})


const message_content = mongoose.model("messageContent", groupchatSchema)
module.exports = message_content