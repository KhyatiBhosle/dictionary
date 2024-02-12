import express from "express";
import bodyParser from "body-parser";
import https from "https";

const app = express();
const port = 3000;
const url = "https://api.dictionaryapi.dev/api/v2/entries/en/"
var wordData = {};
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.render('index.ejs');
});

app.get('/word', (req, res) => {
    res.render('word.ejs', {data: wordData})
});

app.post('/word', (req, res) => {
    var wordUrl = url + req.body.word;

    fetch(wordUrl).then((response) => {
        response.json().then((data) => {
            if(data[0]){
                wordData = {
                    word: data[0].word,
                    phonetic: data[0].phonetic,
                    meanings: data[0].meanings
                }
            }
           else{
            wordData = data
           }
           res.redirect('/word');
        }).catch((err) => {
            console.log(err)
        })
    }).catch((err) => {
        console.log(err);
    })
});

app.listen(port, (err)=>{
    if(err){console.log(err);}
    else{console.log(`Server listening on port ${port}`);}
});