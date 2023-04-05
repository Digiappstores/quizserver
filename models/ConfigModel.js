const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ConfigSchema = new Schema({}, { strict: false });

ConfigSchema.set('toJSON', {
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id
    }
})

module.exports = mongoose.model('Config', ConfigSchema, 'configs');
