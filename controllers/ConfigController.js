const ConfigService  = require("../services/ConfigService");

exports.getAllConfig = async (req, res) => {
  try {
    const Config = await ConfigService.getAllConfig();
    res.json({ data: Config, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};