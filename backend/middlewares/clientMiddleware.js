const Client = require('../models/Client');

exports.validateClient = async (req, res, next) => {
    try {
        const client = await Client.findById(req.user.client);
        if (!client) return res.status(404).json({ message: 'Client not found' });

        req.client = client;
        next();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
