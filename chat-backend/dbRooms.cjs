const mongoose = require("mongoose")

const roomSchema = mongoose.Schema({
    name: String,

})


const room_content = mongoose.model("roomContent", roomSchema)
module.exports = room_content