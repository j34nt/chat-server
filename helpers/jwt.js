const jwt = require('jsonwebtoken');

const generatJWT = (uid) => {
    return new Promise((resolve,reject) => {
        const payload = {
            uid
        };
        jwt.sign(payload, process.env.JWT_KEY, {
            expiresIn:'24h'
        }, (err, token) => {
            if(err) {
                // can´t create token
                reject('Can not generate JWT');
            } else {
                //Token generated
                resolve(token);
    
            }
        });
    })
}

module.exports = {
    generatJWT
}