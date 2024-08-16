const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
    client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client' },
    plan: { type: String, enum: ['employee', 'management'], required: true },
    status: { type: String, enum: ['active', 'inactive'], default: 'inactive' },
    startDate: { type: Date, default: Date.now },
    endDate: { type: Date }
});

module.exports = mongoose.model('Subscription', subscriptionSchema);
