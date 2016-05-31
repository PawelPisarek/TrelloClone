var router = require('express').Router();

/**
 * Reponds with user data.
 * Reponds with 404 if there is no user with provided id. 
 */
router.get('/user/:id', (req, res) => {
    req.app.get('DatabaseConnector').getUser(req.params.id, (user, err) => {
        if (user) {
            console.log('Found user id=' + req.params.id);
            res.json(user);
        } else {
            res.status(404).send(err);
            console.log('User id=' + req.params.id + ' not found. Error:', err);
        } 
    });
});

module.exports = router;