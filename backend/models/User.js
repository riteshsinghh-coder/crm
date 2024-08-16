const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['employee', 'management'], required: true },
    client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client' }
});

module.exports = mongoose.model('User', userSchema);
