/* MAIN */

//IMPORTS AND DECL
const express = require('express');
const app = express();
const axios = require('axios');
const path = require('path');
const URL = "https://mild-mureil-tridevs-6ffae980.koyeb.app";

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
    axios.post(URL + '/api/words/data', data).then(response => {
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
    axios.post(URL + '/api/words/data', data).then(response => {
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
app.post('/new-word', async (req, res) => {
    let data = req.body;
    axios.post(URL + '/api/words/new', data).then(response => {
        res.redirect('/');
    }).catch(error => {
        res.send(error);
        console.error(error);
    });
});
app.post('/new-example', (req, res) => {
    axios.post(URL + '/api/examples/new', req.body).then(response => {
        res.redirect('/');
    }).catch(error => {
        res.send(error)
        console.error(error);
    });
});
app.post('/edit-word', async (req, res) => {
    let data = {
        etymology: req.body.etymology,
        description: req.body.description,
        synonyms: req.body.synonyms,
        english: req.body.english,
        role: req.body.role,
    }
    axios.put(URL + `/api/words/${req.body.oldName}`, data).then(response => {
        res.redirect('/');
    }).catch(error => {
        res.send(error);
        console.error(error);
    });
});
app.get('/', (req, res) => {
    axios.get(URL + '/api/words/all-english').then(response => {
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

app.listen(process.env.PORT || 8080, () => {console.log("Server on :8080")});
