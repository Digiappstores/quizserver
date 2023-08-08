const express = require("express");
const {
  getAllQuestions,
  createQuestion,
  getQuestionById,
  updateQuestion,
  deleteQuestion,
  getQuestionsByUserId,
  filterOptions,
} = require("../controllers/QuestionControllers");

const router = express.Router();
//token based
router.route("/").get(getQuestionsByUserId).post(createQuestion);
//All without token 
router.route("/filteroptions").get(filterOptions);
router.route("/all").get(getAllQuestions);
router.route("/all/:id").get(getAllQuestions);

router.route("/:id").get(getQuestionById).put(updateQuestion).delete(deleteQuestion);

module.exports = router;
