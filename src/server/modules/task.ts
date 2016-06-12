var router = require('express').Router();

// POST /task
// POST /taskMove
// GET /task/:id
// GET /tasks/:id/:idCategory

router.post('/task', (req, res) => {
    var db = req.app.get('DatabaseConnector'),
        dane = {
			name: req.body.name, 
			opis: req.body.opis,
			deadline: req.body.deadline,
			id_board: req.body.id_boards, 
			id_user: req.user.id, 
			id_kategoria: req.body.id_kategorie
        };

    db.createTask(dane, (user, err) => {
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

router.post('/taskEdit', (req, res) => {
    var db = req.app.get('DatabaseConnector'),
        dane = {
            name: req.body.name, 
            opis: req.body.opis,
            deadline: req.body.deadline,
            id_task: req.user.id,
            id_board: req.body.id_boards, 
            id_user: req.user.id, 
            id_kategoria: req.body.id_kategorie
        };

    db.editTask(dane, (user, err) => {
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

router.post('/taskMove', (req, res) => {
    var db = req.app.get('DatabaseConnector'),
        dane = {
			taskID: req.body.task_id, 
			newKatID: req.body.new_kat_id
        };

    db.moveTask(dane.taskID, dane.newKatID, (user, err) => {
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
    req.app.get('DatabaseConnector').getTask(req.params.id, (task, err) => {
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