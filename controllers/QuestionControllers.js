const QuestionService = require("../services/QuestionService");
const JWT = require('jsonwebtoken');
const { getUserIsFromToken } = require("../helpers/jwt_helper");
const { getSequenceNextValue } = require("../helpers/sequencing");

exports.getQuestionsByUserId = async (req, res) => {
  try {
    const aud = getUserIsFromToken(req.headers['authorization'])
    const Questions = await QuestionService.getQuestionsByUserId(aud);
    // console.log('Questions', Questions)
    res.json({ data: { data: Questions, questionCount: Questions.length }, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllQuestions = async (req, res) => {
  console.log("getAllQuestions")
  try {
    const Questions = await QuestionService.getAllQuestions();
    res.json({ data: { data: Questions, questionCount: Questions.length }, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createQuestion = async (req, res) => {
  try {
    const aud = getUserIsFromToken(req.headers['authorization'])
    var seqCounter = await getSequenceNextValue("autogen", "questionid");

    const Question = await QuestionService.createQuestion({
      ...req.body,
      userId: aud,
      questionId: seqCounter.questionid,
      "yourduration": null,
      "yourAnswer": null,
      "favorite": false,
      "countInQuiz": 0,
    });
    res.json({ data: Question, status: "success", message: "Question saved successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getQuestionById = async (req, res) => {
  console.log("getQuestionById")
  try {
    const Question = await QuestionService.getQuestionById(req.params.id);
    res.json({ data: Question, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateQuestion = async (req, res) => {
  console.log("updateQuestion")
  try {
    const Question = await QuestionService.updateQuestion(req.params.id, req.body);
    res.json({ data: Question, status: "success", message: "Question update successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteQuestion = async (req, res) => {
  console.log("deleteQuestion")
  try {
    const Question = await QuestionService.deleteQuestion(req.params.id);
    res.json({ data: Question, status: "success", message: "Question delete successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.filterOptions = async (req, res) => {
  console.log("filterOptions")
  try {
    const Question = await QuestionService.filterOptions();
    console.log('Question', Question)
    res.json({ data: Question, status: "success", message: "Question filter option retrive successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
