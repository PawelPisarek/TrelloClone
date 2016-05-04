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

    //tego nie ma w trello, albo nie widzialem ale chyba musi byc dodane bo kryteriach akceptacji jest że mamy kilka dashboardow
    //no ale na zajeciach mowlismy co innego wiec nie wiem
    app.get('/board/:id', function (data, res) {
        res.status(200).send({
            id: data.param('id')+' id boardu'
        });
    });


    app.get('/tasks', (data, res) => {
        res.status(200).send({
            "tasks": [
                {
                    "id":"1000", //nie zgodne z ustaleniami ale nie wiem o co chodzilo dlaczego tu nie ma id a po nizej jest
                    "tags": ["polishgirl", "vosco"],
                    "label": "opis",
                    "column": "2",
                    "author": "ktos",
                    "users": ["admin", "admin2", "admin3"]
                },
                {
                    "id":"1002",
                    "tags": ["vosco", "polishgirl"],
                    "label": "opis2",
                    "column": "21",
                    "author": "admin",
                    "users": ["ktos", "ktos2", "ktos3"]
                }

            ]
        })
    });

    app.get('/api/task/:id', (data, res)=> {
        res.status(200).send({
            "id": data.param('id'),
            "name": "taskDoZrobienia",
            "column": "1",
            "description": "opis"
        })

    })

};