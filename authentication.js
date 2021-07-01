const { Mongoose } = require('mongoose');
const Users = require('./models/Users');
const { authValidation } = require('./validation');

// User Registration.
const checkBasicAuthentication = (data) => {

    const { error } = authValidation(data);
    if (error) {
        return error.details[0].message;
    }

    const userExist = Users.findOne({ email: data.email });
    if (!userExist) {
        return 'Unauthorized Access.';
    }

    return true;
};

const basicAuthentication = (req, res, next) => {

    // Check for basic auth header
    if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1) {
        return res.status(401).json({ sucess: false, message: 'Unauthorized' });
    }

    const base64Credentials = req.headers.authorization.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [email, password] = credentials.split(':');
    const data = { email, password };
    const isAuthenticated = checkBasicAuthentication(data);
    
    if (isAuthenticated !== true) {
        return res.status(401).json({ success: false, message: isAuthenticated });
    }

    next();
}


module.exports = basicAuthentication;