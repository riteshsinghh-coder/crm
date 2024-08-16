const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String },
    source: { type: String, required: true },
    status: { type: String, enum: ['interested', 'not interested'], default: 'interested' },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    tags: [String],
    client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client' }
});

module.exports = mongoose.model('Lead', leadSchema);
