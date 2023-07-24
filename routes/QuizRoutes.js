const express = require("express");

const { createQuiz, deleteQuiz, getAllQuizs, getQuizId, getQuizsByUserId } = require("../controllers/QuizController");

const router = express.Router();
//token based
router.route("/").post(createQuiz);
//All without token 
router.route("/all").get(getAllQuizs);
router.route("/user/:id").get(getQuizsByUserId);
router.route("/:id").get(getQuizId).delete(deleteQuiz);

module.exports = router;
