const express = require('express');
const path = require('path');
const port = process.env.PORT || 8000;

const app = express();

// setup static folder
// app.use(express.static(path.join(__dirname, 'public')))

/*app.get('/', (req, res) => {
    // res.send('Hello World!');
    res.sendFile(path.join(__dirname, 'public', 'index.html')); // sended die Startseiten HTML seite wenn url "/" ist
});

app.get('/about', (req, res) => { // wird nur bei /about aufgerufen
    // res.send('About');
    res.sendFile(path.join(__dirname, 'public', 'about.html'));
}); */

let posts = [
    { id: 1, title: 'Post 0ne' },
    { id: 2, title: 'Post Two' },
    { id: 3, title: 'Post Three' },
    { id: 4, title: 'Post Four' },
];


// alle posts Bekommen
app.get('/api/posts', (req, res) => {
    const limit = parseInt(req.query.limit);

    if (!isNaN(limit) && limit > 0) {
        res.json(posts.slice(0, limit));

    } else {
        res.json(posts);
    }
})
// einen posts Bekommen
app.get('/api/posts/:id', (req, res) => {
    //console.log(req.params.id)
    const id = parseInt(req.params.id);
    const post = posts.filter((post) => post.id === id);
    res.json(post);
});


app.listen(port, () => console.log(`Server is running on port ${port}`));