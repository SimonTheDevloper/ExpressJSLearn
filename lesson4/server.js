const express = require('express');
const port = process.env.PORT || 8000;

const app = express();

const produkte = [
    { id: 1, name: 'Smartphone Pro', description: 'Neuestes Modell mit Top-Kamera', categorie: 'Elektronik', price: '1200' },
    { id: 2, name: 'Laptop Ultra', description: 'Hochleistung für Gaming und Arbeit', categorie: 'Elektronik', price: '1800' },
    { id: 3, name: 'Kopfhörer ANC', description: 'Over-Ear mit aktiver Geräuschunterdrückung', categorie: 'Elektronik', price: '250' },
    { id: 4, name: 'Kaffeemaschine X', description: 'Vollautomatische Espresso-Maschine', categorie: 'Haushaltswaren', price: '599' },
    { id: 5, name: 'Toaster Deluxe', description: 'Für 4 Scheiben mit Auftaufunktion', categorie: 'Haushaltswaren', price: '65' },
    { id: 6, name: 'Mixer Power', description: 'Smoothie-Mixer mit starkem Motor', categorie: 'Haushaltswaren', price: '90' },
    { id: 7, name: 'Jeans Slim Fit', description: 'Dunkelblaue Herrenjeans, Größe W32/L32', categorie: 'Bekleidung', price: '85' },
    { id: 8, name: 'Winterjacke Arctic', description: 'Wasserabweisende Daunenjacke', categorie: 'Bekleidung', price: '199' },
    { id: 9, name: 'Roman Fantasy', description: 'Gebundene Ausgabe, Bestseller', categorie: 'Medien & Bücher', price: '22' },
    { id: 10, name: 'Hörbuch Thriller', description: 'Digitale Version, Laufzeit 12 Stunden', categorie: 'Medien & Bücher', price: '15' }
];

// console.log(produkte);

// alle Posts senden
/*app.get('/api/produkte', (req, res) => {
    res.json(produkte);
}); */

app.get('/greet/:name/:age', (req, res) => { // man muss zb /greet/MrX/35
    res.send(`Hallo ${req.params.name}! Du bist ${req.params.age} Jahre alt!`) // bekommt dann Hallo MrX! Du bist 35 Jahre alt! zurück
})

app.get('/calculate', (req, res) => { // rechnet es da zB so /calculate?a=1&b=2
    const a = Number(req.query.a);
    const b = Number(req.query.b);

    const summe = a + b
    res.send(summe)
})


/*
// einen eizelelnen produkt senden. Den ruft man da dann so auf: zB: /api/produkte/2
app.get('/api/produkte/:id', (req, res) => {
    const id = parseInt(req.params.id)
    res.json(produkte.filter((produkte) => produkte.id === id));
});
*/

// einen eizelelnen produkt senden. Den ruft man da dann so auf: zB: /api/produkte/2
app.get('/api/produkte/:id', (req, res) => {
    const id = parseInt(req.params.id); // schickt jetzt ein error 404, wenn ein Produkt mit der eigetragenen id nicht exestiert
    const produkt = produkte.find((produkte) => produkte.id === id)

    if (!produkt) {
        return res.status(404).json({ msg: `ein Produkt mit der ID ${id} exestiert nicht` })
    }
    res.status(200).json(produkt)
});

app.get('/api/produkte/', (req, res) => {
    const kategorie = (req.query.kategorie);

    const produkteZurKategorie = produkte.filter(
        (p) => p.categorie.toLowerCase() === kategorie.toLowerCase()
    );
    res.json(produkteZurKategorie);
});

app.get('/api/produkte', (req, res) => {
    const limit = parseInt(req.query.limit) // bekommt das limit als eine Zahl

    if (!isNaN(limit && limit > 0)) // schaut das limit positv und eine Number ist
        res.status(200).json(produkte.slice(0, limit)); // "schneidet" dann das JSON mit dem limit
    else {
        res.status(200).json(produkte)
    }
});



app.listen(port, () => console.log(`Server is running on port ${port}`));