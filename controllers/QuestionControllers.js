const QuestionService = require("../services/QuestionService");

exports.getAllQuestions = async (req, res) => {
  try {
    const Questions = await QuestionService.getAllQuestions();
    res.json({ data: Questions, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createQuestion = async (req, res) => {
  try {
    const Question = await QuestionService.createQuestion(req.body);
    res.json({ data: Question, status: "success",message:"Question saved succssfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getQuestionById = async (req, res) => {
  try {
    const Question = await QuestionService.getQuestionById(req.params.id);
    res.json({ data: Question, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateQuestion = async (req, res) => {
  try {
    const Question = await QuestionService.updateQuestion(req.params.id, req.body);
    res.json({ data: Question, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteQuestion = async (req, res) => {
  try {
    const Question = await QuestionService.deleteQuestion(req.params.id);
    res.json({ data: Question, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
