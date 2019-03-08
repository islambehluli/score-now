const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const postSchema = mongoose.model("posts", new Schema(
    {
        name: {type: Schema.Types.ObjectId, ref: 'users'},
        post: String,
    }, {
        timestamps: true
    }))
    

module.exports = postSchema;