var router = require('express').Router();

router.post('/login', (req, res) => {
    var auth = {
        login: req.body.login,
        password: req.body.pass
    };
    
    req.app.get('DatabaseConnector').getUserByLogin(auth.login, (user, err) => {
        if (err) {
            res.status(500).json({
                error: err
            });
        } else if (!user) {
            res.status(401).json({
                error: 'Invalid user.'
            });
        } else if (user.password === auth.password) {
            res.status(401).json({
                error: 'Invalid password.'
            });
        } else {
            res.json({ //TODO jwt
                token: 'iash12e12edias87uhdiase1e12e'
            });
        }
    });
});

router.post('/register', (req, res) => {
    var auth = {
        login: req.body.login,
        password: req.body.pass
    };
    
    req.app.get('DatabaseConnector').createUser(auth, (user, err) => {
        if (!user || err) {
            res.status(401).json({
                error: err
            });
        } else {
            res.json({ //TODO jwt
                token: 'iash12e12edias87uhdiase1e12e'
            });
        }
    });
});

module.exports = router;