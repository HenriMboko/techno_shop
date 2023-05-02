const jwt = require('jsonwebtoken');

const usersModel = require('../models/userModel')

const protect = async (req, res, next) => {
    let token;


    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            //get token from header
            token = req.headers.authorization.split(' ')[1];

            //verify token
            const decoded = jwt.verify(token, process.env.JWT_KEY);
            //get user from token
            req.user = await usersModel.findById(decoded.id).select("-password");

            next();

        } catch (error) {
            console.log(error);
            res.status(401).json({ message: 'Not Authorized' });

        }
    }
    if (!token) {
        res.status(401).json({ message: 'Not Authorized, Token not found' })
    }
}


const adminUser = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next()
    } else {
        res.status(401).json({ message: "Not authorized as an Admin" })
    }
}


module.exports = { protect, adminUser }