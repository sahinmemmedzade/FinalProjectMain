// generateTokenandSetCookie.js

import jwt from 'jsonwebtoken';

export const genareteTokenandSetCookie = (_id, response) => {
    const token = jwt.sign({ _id }, process.env.JWT_SECRET, {
        expiresIn: '15d'
    });
    response.cookie("jwt", token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
};

// Middleware fonksiyonu
export const authenticateUser = (req, res, next) => {
    // Kullanıcıyı kimlik doğrulaması yap
    const token = req.cookies.jwt;

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
            if (err) {
                console.error(err.message);
                res.status(401).json({ error: 'Unauthorized' });
            } else {
                console.log(decodedToken);
                next();
            }
        });
    } else {
        res.status(401).json({ error: 'Unauthorized' });
    }
};
