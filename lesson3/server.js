const express = require('express');
const app = express();
const path = require('path');
let PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Startseite');
});

app.get('/about', (req, res) => { // wird nur bei /about aufgerufen
    res.send('Über mich: Simon');
});

app.get('/faq', (req, res) => {
    res.send('<h1>häufig gestellte Fragen: <br> Magst du Fische?</h1>'); // gibt es als html zurück
});

app.get('/services', (req, res) => { // schickt einen JSON
    res.json({
        service1: "Web Development",
        service2: "API Design",
        service3: "Backend Hosting"
    });
});

app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'contact.html')); // sendet eine HTML datei 
});

// übungen
app.get('/status', (req, res) => {
    PORT = 8080;
    res.send(`Server läuft auf Port ${PORT}`)
});

app.get('/time', (req, res) => { // man bekommt die Date gesendet
    const now = new Date();
    res.send(`Die jetzige Zeit ist ${now}`)
});



app.listen(PORT, () => console.log(`Server läuft auf Port ${PORT}`));
