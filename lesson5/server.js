const express = require('express');
const port = process.env.PORT || 8000;

const app = express();
app.use(express.json());

const user = [
    { id: 1, name: 'Lola' },
];


app.post('/api/user', (req, res) => {
    if (!req.body.name) {
        return res.status(400).json({ msg: 'Bitte füge den Namen hinzu!' });
    }

    const newUser = {
        // Generiert eine neue ID basierend auf der aktuellen Länge des Arrays + 1
        id: user.length + 1,
        name: req.body.name
    };

    user.push(newUser);

    res.status(201).json(user);

    console.log(`Neuer Benutzer hinzugefügt: ${newUser.name} (ID: ${newUser.id})`);
});

app.get('/api/user', (req, res) => {
    res.status(200).json(user);
});

app.listen(port, () => console.log(`Server läuft auf Port ${port}`));