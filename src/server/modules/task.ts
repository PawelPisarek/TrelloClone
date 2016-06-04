var router = require('express').Router();

// GET /tasks/
// GET /task/:id


router.get('/tasks/:id', (req, res) => {
    req.app.get('DatabaseConnector').getTasks(req.params.id, (tasks, err) => {
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