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

const comprobarJwT = (token = "") => {
    try {
        const {uid} = jwt.verify(token, process.env.JWT_KEY);
        
        return [true,uid];

    } catch (error) {
        return [false,null];
    }

}

module.exports = {
    generatJWT,
    comprobarJwT
}