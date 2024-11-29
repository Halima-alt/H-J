const express = require('express');
const mariadb = require('mariadb');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware CORS et JSON
app.use(cors());
app.use(express.json());

// Configuration de la connexion à MariaDB
const pool = mariadb.createPool({
  host: process.env.DB_HOST || 'db',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_NAME || 'deploiement',
  port: process.env.DB_PORT || 3306,
  connectionLimit: 5,
  acquireTimeout: 30000, // Timeout étendu
});

// Test de connexion au démarrage
const testConnection = async () => {
  try {
    const conn = await pool.getConnection();
    console.log('Connecté à MariaDB !');
    conn.release();
  } catch (err) {
    console.error('Erreur de connexion à MariaDB', err);
    console.error('Paramètres utilisés :', {
      host: process.env.DB_HOST || 'db',
      user: process.env.DB_USER || 'root',
      database: process.env.DB_NAME || 'deploiement',
      port: process.env.DB_PORT || 3306,
    });
  }
};

testConnection();

app.get('/', (req, res) => {
  res.send('Hello lrld!')
})

// Routes pour l'API
app.post('/variable', async (req, res) => {
  try {
    const { Nom, IP, Variable_automate, Fréquence, Unité } = req.body;

    if (!Nom || !IP || !Variable_automate || Fréquence === undefined || !Unité) {
      return res.status(400).json({ error: 'Données invalides fournies.' });
    }

    const conn = await pool.getConnection();
    const result = await conn.query(
      'INSERT INTO variable (Nom, IP, Variable_automate, Fréquence, Unité) VALUES (?, ?, ?, ?, ?)',
      [Nom, IP, Variable_automate, Fréquence, Unité]
    );
    conn.release();

    res.status(201).json({ id: Number(result.insertId), Nom, IP, Variable_automate, Fréquence, Unité });
  } catch (error) {
    console.error('Erreur dans POST /variable :', error);
    res.status(500).json({ error: "Erreur lors de l'ajout d'une variable" });
  }
});

app.get('/variable', async (req, res) => {
  try {
    const conn = await pool.getConnection();
    const result = await conn.query('SELECT * FROM variable');
    conn.release();
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la récupération des variables' });
  }
});

// Lancement du serveur
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
