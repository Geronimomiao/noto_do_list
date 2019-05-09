const mongoose = require('mongoose')
const Schema = mongoose.Schema

const todoSchema = new Schema({
  uuid: String,
  id: String,
  title: String,
  content: Object,
  deadline: String,
  top: {
    type: Boolean,
    default: false
  },
  done: {
    type: Boolean,
    default: false
  }
})

module.exports = mongoose.model('Todo', todoSchema)