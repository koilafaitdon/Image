const express = require('express');
const fs = require("fs")
const app = express();
const port = 3000;
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use(express.static('public'));

app.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'Aucun fichier n\'a été téléchargé.' });
    }

    // Vous pouvez accéder au fichier téléchargé avec req.file.buffer
    const fileBuffer = req.file.buffer;
    console.log(fileBuffer)
    const timestamp = Date.now();
    const fileName = `upload_${timestamp}.txt`; // Vous pouvez utiliser une extension différente en fonction du type de fichier

    // Écrivez le contenu du fichier dans un fichier sur le serveur
    fs.writeFile(`uploads/${fileName}`, fileBuffer, 'base64', (err) => {
        if (err) {
            console.error('Erreur lors de l\'enregistrement du fichier :', err);
            res.status(500).json({ error: 'Erreur lors de l\'enregistrement du fichier' });
        } else {
            console.log('Fichier enregistré avec succès :', fileName);
            res.json({ message: 'Téléchargement réussi' });
        }
    });
    res.json({ message: 'Téléchargement réussi' });
});

app.listen(port, () => {
    console.log(`Le serveur est en cours d'exécution sur le port ${port}`);
});
