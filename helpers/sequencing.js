const mongoose = require("mongoose");

const CounterSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    userid: {
        type: Number,
        required: true
    },
    questionid: {
        type: Number,
        required: true
    }
});

const Counter = mongoose.model('Counter', CounterSchema);

const getSequenceNextValue = (seqId, seqKey) => {
    console.log('seqId, seqKey', seqId)
    return Counter.findByIdAndUpdate(
        { "_id": seqId },
        { "$inc": { [seqKey]: 1 } }

    );
};

module.exports = {
    Counter,
    getSequenceNextValue,
}

