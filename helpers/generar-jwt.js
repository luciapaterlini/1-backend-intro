const jwt = require("jsonwebtoken");

const generarJWT = (uid) => { // user id
    return new Promise ((resolve, reject) => {
        // payload
        const payload = { uid };

        // generar el token
        jwt.sign(
            payload,
            process.env.SECRETORPRIVATEKEY,
            { expiresIn: "4h"},
            (err, token) => {
                if (err){
                    console.log(err);
                    reject("No se puede generar el TOKEN");
                } else {
                    resolve(token);
                }
            }
        );
    });
};

module.exports = {
    generarJWT,
};