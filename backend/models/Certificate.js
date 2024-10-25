const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema({
    recipientName: { type: String, required: true },
    eventName: { type: String, required: true },
    certificateId: { type: String, required: true, unique: true },
    certificateUrl: { type: String, required: true },
    organizerName: { type: String, required: true },
    inChargeName: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Certificate', certificateSchema);
