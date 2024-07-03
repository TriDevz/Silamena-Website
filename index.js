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

function filterArray(arr, init) {
    return arr.filter(string => string.startsWith(init));
}


app.get('/word/:word', (req, res) => {
    const word = req.params.word;
    const data = {
        names: [word]
    }
    axios.post('http://localhost:3005/api/words/data', data).then(response => {
        let data = response.data;
        
        if(data.data.length) {
            let word = data.data[0]
            res.render('word', {word});
        } else {
            res.send("The word doesn't exist")
        }
        
    }).catch(error => {
        console.error(error);
    });
});
app.get('/word/exists/:word', (req, res) => {
    const word = req.params.word;
    axios.post('http://localhost:3005/api/words/data', data).then(response => {
        let data = response.data;
        
        if(data.data.length) {
            res.json({exists: true});
        } else {
            res.json({exists: false});
        }
        
    }).catch(error => {
        console.error(error);
    });
})
app.get('/new/word', (req, res) => {
    res.render('new', {});
});
app.post('/new-word', (req, res) => {
    axios.post('http://localhost:3005/api/words/new', req.body).then(response => {
        res.redirect('/');
    }).catch(error => {
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
        console.error(error);
    });
});

app.listen(8080, () => {console.log("Server on :8080")});