const mongoose = require('mongoose');
var Schema = mongoose.Schema

const authorSchema = new Schema({
  title: {type: String, require: true},
  content: {type: String, require: true, minlength: 10},
  author_name: {type: String, require: true, lowercase: true},
  author_phone: {type: String, minlength: 7},
  email: {type: String, require: true, match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'Please fill a valid email']}
})

let Blog = mongoose.model('Blog', authorSchema)

module.exports = Blog;