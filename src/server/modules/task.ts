var router = require('express').Router();

// GET /tasks/
// GET /task/:id

router.post('/task', (req, res) => {
    var db = req.app.get('DatabaseConnector'),
        dane = {
			name: req.body.name, 
			opis: req.body.opis, 
			id_board: req.body.idBoard, 
			id_user: req.body.author, 
			id_kategoria: req.body.idKategoria
        };

    db.createTask(dane, (user, err) => {
		console.log('task.ts:');
		console.log(dane);
        if (err) {
            res.status(500).json({ //TODO: more user friendly message?
                error: err.message,
                errno: err.errno
            });
        } else {
            res.json({
                data: 'Odswiez taski'
            });
        }
    });
});

router.get('/tasks/:id/:idCategory', (req, res) => {
    req.app.get('DatabaseConnector').getTasks(req.params, (tasks, err) => {
        if (tasks) {
            console.log('Found task for board id=' + req.params.id);
            res.json(tasks);
        } else {
            res.status(404).send(err);
            console.log('tasks id=' + req.params.id + ' not found. Error:', err);
        }
    });
});

router.get('/task/:id', (req, res) => {
    req.app.get('DatabaseConnector').getBoard(req.params.id, (task, err) => {
        if (task) {
            console.log('Found task id=' + req.params.id);
            res.json(task);
        } else {
            res.status(404).send(err);
            console.log('tasks id=' + req.params.id + ' not found. Error:', err);
        }
    });
});



module.exports = router;