const jwt = require('jsonwebtoken');

const verifyToken = (token, secret) => {
    //console.log(token);
    const verifiedToken = jwt.verify(token, secret);
    console.log(verifiedToken);
    return verifiedToken;
}

module.exports = verifyToken;