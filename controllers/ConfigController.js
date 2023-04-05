const { getUserIsFromToken } = require("../helpers/jwt_helper");
const ConfigService = require("../services/ConfigService");
const QuestionService = require("../services/QuestionService");

exports.getAllConfig = async (req, res) => {
  try {
    const Config = await ConfigService.getAllConfig();
    // console.log('Config', Config)
    const aud = getUserIsFromToken(req.headers['authorization'])
    const Questions = await QuestionService.getQuestionsByUserId(aud);

    res.json({ data: { data: Config[0], questionCount: Questions.length }, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};