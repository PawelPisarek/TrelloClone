var router = require('express').Router(),
    jwt = require('jsonwebtoken');

/**
 * Verifies if provided token is valid. Responds with 403 if not.
 * @param req
 * @param res
 * @param next
 * @param err Error from token decoding
 * @param decodedUserInfo 
 */    
function tokenVerify(req, res, next, err, decodedUserInfo) {
    if (err) {
        res.status(403).json({
            message: 'Not authorized'
        });
    } else {
        req.user = decodedUserInfo;
        next();
    }
}

/**
 * Logs in the user.
 * Reponds with jwt if login data is correct.
 * Respond with 500 if db failed or 401 if login data is incorrect.
 */
router.post('/login', (req, res) => {
    var auth = {
        login: req.body.login,
        password: req.body.pass //TODO: pass?
    };
    
    req.app.get('DatabaseConnector').getUserAuthByLogin(auth.login, (user, err) => {
        if (err) {
            res.status(500).json({
                error: err.message,
                errno: err.errno
            });
        } else if (!user) {
            res.status(401).json({
                error: 'Invalid user.'
            });
        } else if (user.password !== auth.password) {
            res.status(401).json({
                error: 'Invalid password.'
            });
        } else {
            res.json({
                token: jwt.sign(user, req.app.get('jwtSecret'), {
                    expiresIn: '24h'
                })
            });
        }
    });
});

/**
 * Registers user.
 * Responds with jwt token if user is created.
 * Responds with 500 if not.
 */
router.post('/register', (req, res) => {
    var db = req.app.get('DatabaseConnector'),
        auth = {
            login: req.body.login,
            password: req.body.pass
        };
    
    db.createUser(auth, (user, err) => {
        if (err) {
            res.status(500).json({ //TODO: more user friendly message?
                error: err.message,
                errno: err.errno
            });
        } else {
            db.getUserAuthByLogin(auth.login, (user, err) => {
                res.json({
                    token: jwt.sign(user, req.app.get('jwtSecret'), {
                        expiresIn: '24h'
                    })
                });
            })
        }
    });
});

/**
 * Authenticates user and passes execution to next callback.
 * Reponds with 403 if token is omitted or invalid.
 */
router.use((req, res, next) => {
    var token = req.query.token || req.headers['x-access-token'];

    if (token) {
        jwt.verify(token, req.app.get('jwtSecret'), tokenVerify.bind(this, req, res, next));
    } else {
        res.status(403).json({
            message: 'No token provided'
        });
    }
});

module.exports = router;