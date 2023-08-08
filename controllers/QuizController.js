const QuizService = require("../services/QuizService");
const QuestionService = require("../services/QuestionService");

const JWT = require('jsonwebtoken');
const { getUserIsFromToken } = require("../helpers/jwt_helper");
const { getSequenceNextValue } = require("../helpers/sequencing");

exports.getAllQuizs = async (req, res) => {
  console.log('getAllQuizs')
  try {
    const Quizs = await QuizService.getAllQuizs();
    var data = Quizs.map((o) => ({ ...o._doc, score: 0 }))
    // console.log('first', Quizs)
    res.json({ data: { data: data, quizCount: Quizs.length }, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getQuizId = async (req, res) => {
  try {
    const Quiz = await QuizService.getQuizById(req.params.id);
    var quesArr = await Quiz[0].quesIdArr.map(async (o) => await QuestionService.getQuestionById(o))
    Promise.all(quesArr).then((arrayOfArrays) => {
      Quiz[0].quesIdArr = [].concat.apply([], arrayOfArrays)
      res.json({ data: Quiz, status: "success" });
    });


  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getQuizsByUserId = async (req, res) => {
  try {
    const aud = getUserIsFromToken(req.headers['authorization'])
    const Quizs = await QuizService.getQuizsByUserId(aud);
    var data = Quizs.map((o) => ({ "date": o.date, "score": o.score, "quizId": o.quizId, "userId": o.userId }))
    // console.log('Quizs', Quizs)
    res.json({ data: { data: data, quizCount: data.length }, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.createQuiz = async (req, res) => {
  try {
    const aud = getUserIsFromToken(req.headers['authorization'])
    var seqCounter = await getSequenceNextValue("autogen", "quizid");
    const Quiz = await QuizService.createQuiz({ ...req.body, userId: aud, quizId: seqCounter.quizid });
    res.json({ data: Quiz, status: "success", message: "Quiz saved successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateQuiz = async (req, res) => {
  console.log("updateQuiz", req.params.id)
  try {
    const Quiz = await QuizService.updateQuiz(req.params.id, req.body);
    res.json({ data: Quiz, status: "success", message: "Quiz update successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.deleteQuiz = async (req, res) => {
  try {
    const Quiz = await QuizService.deleteQuiz(req.params.id);
    console.log('Quiz', Quiz)
    res.json({ status: "success", message: `Quiz id: ${req.params.id} delete successfully` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
