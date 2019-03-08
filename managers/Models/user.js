const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const userSchema = mongoose.model("users", new Schema(
    {
        name: String,
        email:   String,
        password: String,
        favouriteTeam: String,
        messages: [{ type: Schema.Types.ObjectId, ref: "posts"}]
    }, {
        timestamps: true
    }))

module.exports = userSchema