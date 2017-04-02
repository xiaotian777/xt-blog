var mongoose = require('mongoose');

var Post = mongoose.model('Post', {
  title: {
    type: String,
    require: true,
    minlength: 1,
    trim: true
  },
  body: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  category: {
    type: String,
    trim: true,
    default: null
  },
  post_id: {
    type: String,
    trim: true,
    required: true,
    unique: true
  },
  assets_url: {
    type: Array,
    default: []
  },
  hero_url: {
    type: String,
    trim: true,
    defualt: null
  },
  _createdAt: {
    type: Number,
    default: new Date().getTime()
  }
});

module.exports = {Post};