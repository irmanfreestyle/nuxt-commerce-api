const jwt = require('jsonwebtoken');
const config = require('../config/config.js');

module.exports = (req, res, next) => {
    try {
        // const token = req.headers.authorization.split(" ")[1]
        let token = req.headers.authorization;
        const decoded = jwt.verify(token, config.SECRET);
        req.userData = decoded;
        next();
    } catch(err) {
        return res.json({
            status: false,
            message: 'Auth not valid'
        });
    }
}