var router = require('express').Router();

// POST /board
// GET /board/:id/:userID
// GET /kategorie

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
                data: 'nie wiem pewnie siê doda³o ale jak to sprawdziæ?'
            });
        }
    });
});

router.get('/board/:id/:userID', (req, res) => {
    req.app.get('DatabaseConnector').getBoard(req.params.id, req.params.userID, (boards, err) => {
        if (boards) {
            console.log('Found board id=' + req.params.id);
            res.json(boards);
        } else {
            res.status(404).send(err);
            console.log('Boards id=' + req.params.id + ' not found. Error:', err);
        }
    });
});

router.get('/kategorie', (req, res) => {
    req.app.get('DatabaseConnector').getKategorie((kategorie, err) => {
        if (kategorie) {
            console.log('Pobralem kategorie:');
            console.log(kategorie);
            res.json(kategorie);
        } else {
            res.status(404).send(err);
            console.log('Kategorie not found. Error:', err);
        }
    });
});

module.exports = router;