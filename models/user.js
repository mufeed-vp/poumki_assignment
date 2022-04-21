const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Types = mongoose.Schema.Types

const userSchema = new Schema({
    firstName : { type: Types.String, required: true, trim: true },
    lastName : { type: Types.String, required: true, trim: true },
    email : { type: Types.String, required: true, trim: true },
    joiningDate: { type: Schema.Types.Date, required: true },
},{ versionKey: false })

module.exports = mongoose.model('user', userSchema)