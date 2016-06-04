var router = require('express').Router();

// POST /checklist
// POST /checklistUpdate
// GET /checklist/:id

router.post('/checklist', (req, res) => {
    var db = req.app.get('DatabaseConnector'),
        dane = {
			name: req.body.name, 
			id_task: req.body.id_task,
			is_check: req.body.is_check
        };

    db.createChecklist(dane, (user, err) => {
        if (err) {
            res.status(500).json({ //TODO: more user friendly message?
                error: err.message,
                errno: err.errno
            });
        } else {
            res.json({
                data: 'Odswiez'
            });
        }
    });
});

router.post('/checklistUpdate', (req, res) => {
    var db = req.app.get('DatabaseConnector'),
        dane = {
			id: req.body.id, 
			checked: req.body.checked
        };

    db.updateChecklist(dane.id, dane.checked, (user, err) => {
        if (err) {
            res.status(500).json({ //TODO: more user friendly message?
                error: err.message,
                errno: err.errno
            });
        } else {
            res.json({
                data: 'Odswiez'
            });
        }
    });
});

router.get('/checklist/:id', (req, res) => {
    req.app.get('DatabaseConnector').getChecklist(req.params.id, (tasks, err) => {
        if (tasks) {
            console.log('Found checklist for task id=' + req.params.id);
            res.json(tasks);
        } else {
            res.status(404).send(err);
            console.log('Checklist for task id=' + req.params.id + ' not found. Error:', err);
        }
    });
});

module.exports = router;