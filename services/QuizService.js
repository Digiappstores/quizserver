const QuizModel = require("../models/QuizModel");

exports.getAllQuizs = async () => {
  console.log("getAllQuizs")
  return await QuizModel.find().sort({ "quizId": -1 });
};
exports.getQuizById = async (quizId) => {
  return await QuizModel.find({ quizId });
};
exports.getQuizsByUserId = async (userId) => {
  return await QuizModel.find({ userId });
};

exports.createQuiz = async (quiz) => {
  return await QuizModel.create(quiz);
};
exports.deleteQuiz = async (quizId) => {
  return await QuizModel.findOneAndDelete({ quizId });
};

exports.inActiveQuiz = async (quizId, Quiz) => {
  return await QuizModel.findOneAndUpdate({ quizId }, Quiz, { new: true });
};
exports.updateQuiz = async (quizId, Quiz) => {
  return await QuizModel.findOneAndUpdate({ quizId }, Quiz, { new: true });
};
