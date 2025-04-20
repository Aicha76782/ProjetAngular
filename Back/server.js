const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Connexion à MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Connecté à MongoDB');
    console.log('Base de données utilisée:', mongoose.connection.db.databaseName); // Log de la base de données
  })
  .catch(err => console.error('Erreur de connexion à MongoDB:', err));

const userSchema = new mongoose.Schema({
  id: String,
  nom: String,
  password: String
});

const User = mongoose.model('User', userSchema, 'CollectionMbds');

app.post('/api/login', async (req, res) => {
  const { nom, password } = req.body;
  try {
    const user = await User.findOne({ nom, password });
    if (user) {
      res.json({ success: true, user });
    } else {
      res.json({ success: false, message: 'Nom d\'utilisateur ou mot de passe incorrect' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erreur serveur' });
  }
});

app.post('/api/signup', async (req, res) => {
  const { nom, password } = req.body;
  try {
    console.log('Tentative de création d\'utilisateur avec nom:', nom);
    const existingUser = await User.findOne({ nom });
    if (existingUser) {
      console.log('Utilisateur existant trouvé:', existingUser);
      return res.json({ success: false, message: 'Ce nom d\'utilisateur existe déjà' });
    }

    const newUser = new User({
      id: new mongoose.Types.ObjectId().toString(),
      nom,
      password
    });

    console.log('Nouvel utilisateur à enregistrer:', newUser);
    await newUser.save();
    console.log('Utilisateur enregistré avec succès dans CollectionMbds');
    res.json({ success: true, user: newUser });
  } catch (error) {
    console.error('Erreur lors de la création de l\'utilisateur:', error);
    res.status(500).json({ success: false, message: 'Erreur serveur' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));