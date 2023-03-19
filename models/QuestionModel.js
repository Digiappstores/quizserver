const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
    label: String,
    type: String,
    question: String,
    option1: String,
    option2: String,
    option3: String,
    option4: String,
    answer: String
});

module.exports = mongoose.model("Question", questionSchema);