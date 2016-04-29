module.exports = function (app) {
    app.get('/dashboard', function (data, res) {
        res.status(200).send({
            boards: [
                {
                    id: "1",
                    name: "angular2",
                    author: "Łysy"
                },
                {
                    id: "2",
                    name: "express nigdy nie działa",
                    author: "Kudłaty"
                }]
        });
    });

};