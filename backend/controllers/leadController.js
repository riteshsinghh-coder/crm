const Lead = require('../models/Lead');

exports.getLeads = async (req, res) => {
    try {
        const leads = await Lead.find({ client: req.user.client });
        res.status(200).json(leads);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateLead = async (req, res) => {
    try {
        const lead = await Lead.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(lead);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.assignLead = async (req, res) => {
    try {
        const lead = await Lead.findById(req.params.id);
        lead.assignedTo = req.body.assignedTo;
        await lead.save();
        res.status(200).json(lead);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.filterLeads = async (req, res) => {
    try {
        const { status, tags } = req.query;
        const filter = { client: req.user.client };

        if (status) filter.status = status;
        if (tags) filter.tags = { $in: tags };

        const leads = await Lead.find(filter);
        res.status(200).json(leads);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
