var router = require('express').Router();

// GET /boards/
// GET /board/:id


router.get('/boards/:id', (req, res) => {
    req.app.get('DatabaseConnector').getBoards(req.params.id, (boards, err) => {
        if (boards) {
            console.log('Found bosdards id=' + req.params.id);
            res.json(boards);
        } else {
            res.status(404).send(err);
            console.log('Boards id=' + req.params.id + ' not found. Error:', err);
        }
    });
});

module.exports = router;