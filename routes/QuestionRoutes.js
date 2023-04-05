const express = require("express");
const {
  getAllQuestions,
  createQuestion,
  getQuestionById,
  updateQuestion,
  deleteQuestion,
  getQuestionsByUserId,
} = require("../controllers/QuestionControllers");

const router = express.Router();
//token based
router.route("/").get(getQuestionsByUserId).post(createQuestion);
router.route("/:id").get(getQuestionById).put(updateQuestion).delete(deleteQuestion);
//All without token 
router.route("/all").get(getAllQuestions);
router.route("/all/:id").get(getAllQuestions);

module.exports = router;
