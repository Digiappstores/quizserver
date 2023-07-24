const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
  questionDetails: Array,
  date: String,
  score: String,
  quizId: String,
  userId: String,
  quizCount: String
});

quizSchema.set('toJSON', {
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id
  }
})

module.exports = mongoose.model("quiz", quizSchema);