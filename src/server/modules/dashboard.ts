var router = require('express').Router();

// GET /boards/
// GET /board/:id


router.post('/board', (req, res) => {
    var db = req.app.get('DatabaseConnector'),
        auth = {
            name: req.body.name,
            author: req.body.author
        };

    db.createBoard(auth, (user, err) => {
        if (err) {
            res.status(500).json({ //TODO: more user friendly message?
                error: err.message,
                errno: err.errno
            });
        } else {
            res.json({
                data: 'nie wiem pewnie się dodało ale jak to sprawdzić?'
            });
        }
    });
});

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

router.get('/board/:id', (req, res) => {
    req.app.get('DatabaseConnector').getBoard(req.params.id, (boards, err) => {
        if (boards) {
            console.log('Found board id=' + req.params.id);
            res.json(boards);
        } else {
            res.status(404).send(err);
            console.log('Boards id=' + req.params.id + ' not found. Error:', err);
        }
    });
});



module.exports = router;