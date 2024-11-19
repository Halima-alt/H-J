
const express = require('express');
const mariadb = require('mariadb');
const cors = require('cors'); // Importer le middleware CORS


const app = express();
const port = 3000;


// Utiliser le middleware CORS
app.use(cors());


// Utiliser le middleware pour traiter les requêtes JSON
app.use(express.json());

// Configuration de la connexion à MariaDB
const pool = mariadb.createPool({
    host: 'localhost', 
    user: 'root', 
    password: 'root', 
    database: 'déploiement',
    connectionLimit: 5 
  });

  pool.getConnection()
  .then(conn => {
    console.log("Connecté à MariaDB !");
    conn.release(); // Libérer la connexion
  })
  .catch(err => {
    console.error("Erreur de connexion à MariaDB", err);
    // Vous pouvez également afficher un message spécifique
    if (err.code === 'ECONNREFUSED') {
      console.error("La connexion a été refusée. Vérifiez que MariaDB est en cours d'exécution.");
    } else if (err.code === 'ETIMEDOUT') {
      console.error("Le délai de connexion a expiré.");
    }
  });

    // VARIABLE         VARIABLE        VARIABLE           VARIABLE         VARIABLE        VARIABLE        VARIABLE 
    app.post('/variable', async (req, res) => {
        try {
          const { ID_VARIABLE, Nom, IP, Variable_automate, Fréquence, Valeur, Unité} = req.body;
          
          // Vérification des données fournies
          if (ID_VARIABLE === undefined || Nom === undefined || IP === undefined || Variable_automate || Fréquence || Valeur || Unité === undefined) {
            return res.status(400).json({ error: 'Données invalides fournies' });
          }
      
          // Connexion à la base de données et insertion des données
          const conn = await pool.getConnection();
          const result = await conn.query('INSERT INTO status (ID_VARIABLE, Nom, IP, Variable_automate, Fréquence, Valeur, Unité) VALUES (?, ?, ?, ?, ?, ?, ?)', 
            [ID_VARIABLE, Nom, IP, Variable_automate, Fréquence, Valeur, Unité]
          );
          conn.release();
      
          // Réponse avec l'ID de l'enregistrement ajouté et les données fournies
          res.status(201).json({ id: Number(result.insertId), ID_VARIABLE, Nom, IP, Variable_automate, Fréquence, Valeur, Unité});
          
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Erreur lors de l\'ajout d\'une variable' });
        }
      });

      app.get('/variable', async (req, res) => {
        try {
          const conn = await pool.getConnection();
          const result = await conn.query('SELECT * FROM variable'); // Sélectionne toutes les maisons
          conn.release();
          res.status(200).json(result); // Renvoie les résultats au format JSON
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Erreur lors de la récupération des variables' }); // Gestion des erreurs
        }
      });


    // AUTOMATE         AUTOMATE        AUTOMATE        AUTOMATE        AUTOMATE
    app.post('/automate', async (req, res) => {
        try {
          const {ID_AUTOMATE, Nom, IP, Type} = req.body;
          
          // Vérification des données fournies
          if (ID_AUTOMATE === undefined || Nom === undefined || IP === undefined || Type === undefined) {
            return res.status(400).json({ error: 'Données invalides fournies' });
          }
      
          // Connexion à la base de données et insertion des données
          const conn = await pool.getConnection();
          const result = await conn.query('INSERT INTO status (ID_AUTOMATE, Nom, IP, Type) VALUES (?, ?, ?, ?)', 
            [ID_AUTOMATE, Nom, IP, Type]
          );
          conn.release();
      
          // Réponse avec l'ID de l'enregistrement ajouté et les données fournies
          res.status(201).json({ id: Number(result.insertId), ID_AUTOMATE, Nom, IP, Type});
          
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Erreur lors de l\'ajout d\'un automate ' });
        }
      });

      app.get('/automate', async (req, res) => {
        try {
          const conn = await pool.getConnection();
          const result = await conn.query('SELECT * FROM automate'); // Sélectionne toutes les maisons
          conn.release();
          res.status(200).json(result); // Renvoie les résultats au format JSON
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Erreur lors de la récupération des variables' }); // Gestion des erreurs
        }
      });