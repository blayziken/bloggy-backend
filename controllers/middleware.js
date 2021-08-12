const jwt = require('jsonwebtoken');

let checkToken = (req, res, next) => {
    console.log('ass');
    let token = req.headers["authorization"];
    console.log(token);
    token = token.slice(7, token.length);

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.json({
                    status: false,
                    msg: "token is invalid"
                })
            } else {
                req.decoded = decoded;
                next();
            }
        })
    } else {
        return res.json({
            status: false,
            msg: "Token is not provided"
        })
    }
    next();

};

module.exports = {
    checkToken: checkToken,
};