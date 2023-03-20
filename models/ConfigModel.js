const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ConfigSchema = new Schema({}, { strict: false });
module.exports = mongoose.model('Config', ConfigSchema, 'configs');
