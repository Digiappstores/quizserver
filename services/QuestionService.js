const QuestionModel = require("../models/QuestionModel");

exports.getAllQuestions = async () => {
  return await QuestionModel.find();
};

exports.createQuestion = async (Question) => {
  return await QuestionModel.create(Question);
};
exports.getQuestionById = async (id) => {
  return await QuestionModel.findById(id);
};

exports.updateQuestion = async (id, Question) => {
  return await QuestionModel.findByIdAndUpdate(id, Question);
};

exports.deleteQuestion = async (id) => {
  return await QuestionModel.findByIdAndDelete(id);
};
