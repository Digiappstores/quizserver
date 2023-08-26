const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
  quesIdArr: Array,
  duration: String,
  title: String,
  tags: Array,
  Attempt: String,
  win: String,
  favorite: Boolean,
  quizId: String,
  userId: String,
  attempt: String,
  status: String,
  pass: String,
  loose: String,
  isActive: Boolean,
  userArr: Array,
});

quizSchema.set('toJSON', {
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id
  }
})

module.exports = mongoose.model("quiz", quizSchema);