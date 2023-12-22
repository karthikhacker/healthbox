const LabUser = require('../models/lab-user');

const labProfile = (req, res, next) => {
    res.json(req.user);
}
module.exports = labProfile