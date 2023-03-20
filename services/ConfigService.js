const ConfigModel = require("../models/ConfigModel");

exports.getAllConfig = async () => {
  return await ConfigModel.find();
};
