const jwt = require('jsonwebtoken');

const createToken = (id, secret, expiry) => {
    let token = jwt.sign({ id: `${id}` }, secret, { expiresIn: `${expiry}` })
    return token;
}

module.exports = createToken;