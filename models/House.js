const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)

const houseSchema = new mongoose.Schema(
    {
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    }
},
{
    timestamps: true
}
)

houseSchema.plugin(AutoIncrement, {
    inc_field: 'number',
    id: 'houseNums',
    start_seq: 500
})

module.exports = mongoose.model('House', houseSchema)