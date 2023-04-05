const QuestionModel = require("../models/QuestionModel");

exports.getAllQuestions = async () => {
  return await QuestionModel.find();
};
exports.getQuestionsByUserId = async (userId) => {
  return await QuestionModel.find({ userId });
};

exports.createQuestion = async (Question) => {
  return await QuestionModel.create(Question);
};
exports.getQuestionById = async (questionId) => {
  return await QuestionModel.find({ questionId });
};

exports.updateQuestion = async (questionId, Question) => {
  return await QuestionModel.findOneAndUpdate({ questionId }, Question, { new: true });
};

exports.deleteQuestion = async (questionId) => {
  return await QuestionModel.findOneAndDelete({ questionId });
};
