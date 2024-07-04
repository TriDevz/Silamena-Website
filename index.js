/* MAIN */

//IMPORTS AND DECL
const express = require('express');
const app = express();
const axios = require('axios');
const path = require('path');

//USES
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'pug');
app.set('views', './views');

app.get('/word/:word', (req, res) => {
    const word = req.params.word;
    const data = {
        names: [word]
    }
    axios.post('http://localhost:3005/api/words/data', data).then(response => {
        let data = response.data;
        if(data.data.length) {
            data.data[0].description = data.data[0].description.replace(/\r\n|\r|\n/g, '<br>');
            let word = data.data[0]
            res.render('word', {word});
        } else {
            res.send("The word doesn't exist")
        }
        
    }).catch(error => {
        console.error(error);
    });
});
app.get('/new/word', (req, res) => {
    res.render('new-word', {});
});
app.get('/new/example', (req, res) => {
    res.render('new-example', {});
});
app.get('/edit/word/:word', (req, res) => {
    const word = req.params.word;
    const data = {
        names: [word]
    }
    axios.post('http://localhost:3005/api/words/data', data).then(response => {
        let data = response.data;
        
        if(data.data.length) {
            let word = data.data[0]
            res.render('edit-word', {word});
        } else {
            res.send("The word doesn't exist")
        }
        
    }).catch(error => {
        console.error(error);
    });
})

//POSTS
app.post('/new-word', (req, res) => {
    let data = req.body;
    axios.post('http://localhost:3005/api/words/new', data).then(response => {
        res.redirect('/');
    }).catch(error => {
        res.send(error);
        console.error(error);
    });
});
app.post('/new-example', (req, res) => {
    axios.post('http://localhost:3005/api/examples/new', req.body).then(response => {
        res.redirect('/');
    }).catch(error => {
        res.send(error)
        console.error(error);
    });
});
app.post('/edit-word', (req, res) => {
    let data = {
        etymology: req.body.etymology,
        description: req.body.description,
        synonyms: req.body.synonyms,
        english: req.body.english,
        role: req.body.role,
    }
    axios.put(`http://localhost:3005/api/words/${req.body.oldName}`, data).then(response => {
        res.redirect('/');
    }).catch(error => {
        res.send(error);
        console.error(error);
    });
});
app.get('/', (req, res) => {
    axios.get('http://localhost:3005/api/words/all-english').then(response => {
        let data = {
            list: response.data
        }
        res.render('index', data);
    }).catch(error => {
        let data = {
            list: ["nope"]
        }
        res.render('index', data);
        console.log("api not reachable");
    });
});

app.listen(8080, () => {console.log("Server on :8080")});