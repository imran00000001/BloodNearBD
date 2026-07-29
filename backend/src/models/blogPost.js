const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  author: {
    type: String,
    require: true,
  },
  blogContent: {
    type: String,
  },
  blogImg: {
    type: String,
  },
  date: {
    type: String,
  },
  blogStatus: {
    type: String,
    enum: ["draft", "published", "unpublished"],
  },
});

const blog = mongoose.model("blogs", blogSchema);

module.exports = blog;
