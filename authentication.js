const basicAuthentication = (req, res, next) => {

    // Check for basic auth header
    if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1) {
        return res.status(401).json({ sucess: false, message: 'Unauthorized' });
    }

    // const base64Credentials =  req.headers.authorization.split(' ')[1];
    // const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    // const [username, password] = credentials.split(':');
    // console.log({ username, password });

    next();
}

module.exports = basicAuthentication