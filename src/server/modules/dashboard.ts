var router = require('express').Router();

// GET /boards/:id <- Id uzytkownika, ktorego boardy maja byc wyswietlone

router.get('/boards', (req, res) => {
    req.app.get('DatabaseConnector').getBoards(req.user.id, (boards, err) => {
        if (boards) {
            console.log('Found bosdards for user id=' + req.user.id);
            console.log(boards);
            res.json(boards);
        } else {
            res.status(404).send(err);
            console.log('Boards for user id=' + req.user.id + ' not found. Error:', err);
        }
    });
});

module.exports = router;