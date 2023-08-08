const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuestionFilterSchema = new Schema({}, { strict: false });

QuestionFilterSchema.set('toJSON', {
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id
  }
})

module.exports = mongoose.model('QuestionFilter', QuestionFilterSchema, 'questionfilter');
