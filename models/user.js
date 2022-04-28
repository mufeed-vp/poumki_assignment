const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Types = mongoose.Schema.Types
const AutoIncrement = require('mongoose-sequence')(mongoose)

const userSchema = new Schema({
    userCount : { type: Types.Number, required: true, default: 0 },
    firstName : { type: Types.String, required: true, trim: true },
    lastName : { type: Types.String, required: true, trim: true },
    email : { type: Types.String, required: true, trim: true },
    registeredDate: { type: Schema.Types.Date, required: true },
},{ versionKey: false })

productSchema.plugin(AutoIncrement,{ inc_field: 'userCount' });
module.exports = mongoose.model('user', userSchema)