const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
    question: Object,
    options: Object,
    answer: String,
    status: String,
    filterBy: Object,
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