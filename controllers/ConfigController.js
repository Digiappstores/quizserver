const { getUserIsFromToken } = require("../helpers/jwt_helper");
const ConfigService = require("../services/ConfigService");
const QuestionService = require("../services/QuestionService");

exports.getAllConfig = async (req, res) => {
  try {
    const Config = await ConfigService.getAllConfig();
    res.json({ data: Config[0], status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};