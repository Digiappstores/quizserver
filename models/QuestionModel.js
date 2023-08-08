const boolean = require("@hapi/joi/lib/types/boolean");
const number = require("@hapi/joi/lib/types/number");
const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
    question: String,
    options: Array,
    answer: String,
    questType: String,
    optionType: String,
    tags: Array,
    quesChoise: String,
    duration: String,
    favorite: Boolean,
    countInQuiz: Number,
    yourduration: String,
    yourAnswer: String,
    userId: Number,
    questionId: Number,
});

questionSchema.set('toJSON', {
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id
    }
})

module.exports = mongoose.model("Question", questionSchema);