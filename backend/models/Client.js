const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    employees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    subscription: { type: mongoose.Schema.Types.ObjectId, ref: 'Subscription' }
});

module.exports = mongoose.model('Client', clientSchema);
