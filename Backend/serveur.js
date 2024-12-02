const express = require('express');
const mariadb = require('mariadb');
const cors = require('cors');
const ModbusRTU = require("modbus-serial");
const client = new ModbusRTU();


const app = express();
const port = 3000;

// Middleware CORS et JSON
app.use(cors());
app.use(express.json());

// Configuration de la connexion à MariaDB
const db = mariadb.createPool({
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
    const conn = await db.getConnection();
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
    const { Nom, IP, Variable_automate, Adresse_Mot, Fréquence, Unité } = req.body;

    if (!Nom || !IP || !Variable_automate || !Adresse_Mot || Fréquence === undefined || !Unité) {
      return res.status(400).json({ error: 'Données invalides fournies.' });
    }

    const conn = await db.getConnection();
    const result = await conn.query(
      'INSERT INTO variable (Nom, IP, Variable_automate, Adresse_Mot, Fréquence, Unité) VALUES (?, ?, ?, ?, ?, ?)',
      [Nom, IP, Variable_automate, Adresse_Mot, Fréquence, Unité]
    );
    conn.release();

    res.status(201).json({ id: Number(result.insertId), Nom, IP, Variable_automate, Adresse_Mot, Fréquence, Unité });
  } catch (error) {
    console.error('Erreur dans POST /variable :', error);
    res.status(500).json({ error: "Erreur lors de l'ajout d'une variable" });
  }
});

app.get('/variable', async (req, res) => {
  try {
    const conn = await db.getConnection();
    const result = await conn.query('SELECT * FROM variable');
    conn.release();
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la récupération des variables' });
  }
});

app.post('/automate', async (req, res) => {
  try {
    const {ID_AUTOMATE, Nom, IP, Type} = req.body;
   
    // Vérification des données fournies
    if (ID_AUTOMATE === undefined || Nom === undefined || IP === undefined || Type === undefined) {
      return res.status(400).json({ error: 'Données invalides fournies' });
    }

    // Connexion à la base de données et insertion des données
    const conn = await db.getConnection();
    const result = await conn.query('INSERT INTO automate (ID_AUTOMATE, Nom, IP, Type) VALUES (?, ?, ?, ?)',
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
    const conn = await db.getConnection();
    const result = await conn.query('SELECT * FROM automate'); // Sélectionne toutes les maisons
    conn.release();
    res.status(200).json(result); // Renvoie les résultats au format JSON
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la récupération des variables' }); // Gestion des erreurs
  }
});

// TABLEVALEUR    TABLEVALEUR     TABLEVALEUR     TABLEVALEUR     TABLEVALEUR   TABLEVALEUR   TABLEVALEUR     TABLEVALEUR
app.post('/tableauvaleur', async (req, res) => {
try {
console.log("Requête reçue :", req.body); // Log des données reçues

const { Valeur } = req.body;

// Vérification des données fournies
if (Valeur === undefined) {
    console.error("Validation échouée : 'Valeur' est manquant ou undefined");
    return res.status(400).json({ error: 'Données invalides fournies' });
}

const conn = await db.getConnection();
console.log("Connexion à la base de données réussie");

// Exécution de la requête SQL
const result = await conn.query(
    'INSERT INTO tableauValeur (Valeur) VALUES (?)',
    [Valeur]
);
console.log("Requête SQL exécutée avec succès :", result);

conn.release();
console.log("Connexion à la base de données libérée");

// Réponse de succès
res.status(201).json({ id: Number(result.insertId), Valeur });
} catch (error) {
console.error("Erreur dans POST /tableauvaleur :", error.message);
res.status(500).json({ error: 'Erreur lors de l\'ajout d\'une valeur' });
}
});

app.get('/tableauvaleur', async (req, res) => {
try {
    const conn = await db.getConnection();
    const result = await conn.query('SELECT * FROM tableauvaleur'); // Sélectionne toutes les valeurs
    conn.release();
    res.status(200).json(result); // Renvoie les résultats au format JSON
} catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la récupération des valeurs' });
}
});

app.get('/automate/:id/variables', async (req, res) => {
  try {
    const { id } = req.params;
    const conn = await db.getConnection();
    const result = await conn.query('SELECT * FROM variable WHERE ID_AUTOMATE = ?', [id]); // Filtre par ID_AUTOMATE
    conn.release();

    if (!result.length) {
      return res.status(404).json({ error: 'Aucune variable trouvée pour cet automate.' });
    }

    res.status(200).json(result); // Renvoie les variables au format JSON
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la récupération des variables.' }); // Gestion des erreurs
  }
});

app.get('/historique', async (req, res) => {
  try {
      const conn = await db.getConnection();

      // Jointure entre les tables tableauvaleur, variable et automate
      const result = await conn.query(`
          SELECT 
              t.ID_Valeur,
              v.Nom AS Nom_Variable,
              a.Nom AS Nom_Automate,
              v.Fréquence,
              t.Valeur,
              t.Date,
              v.Unité
          FROM tableauvaleur t
          INNER JOIN variable v ON t.ID_Variable = v.ID_Variable
          INNER JOIN automate a ON v.ID_AUTOMATE = a.ID_AUTOMATE
      `);

      conn.release();
      res.status(200).json(result); // Renvoie les résultats au format JSON
  } catch (error) {
      console.error('Erreur lors de la récupération des données historiques :', error);
      res.status(500).json({ error: 'Erreur lors de la récupération des données historiques' });
  }
});




//Lancement du serveur
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

///////////////////////////////////////////////////////////////////////// connexion et retour de 514(AU)

// // Connecter au TCP
// client.connectTCP("172.16.1.24", { port: 502 })
//     .then(() => {
//         console.log("Connexion TCP établie.");
//         client.setID(1); // Définir l'ID de l'unité
//     })
//     .catch((error) => {
//         console.error("Erreur lors de la connexion TCP :", error.message);
//     });

// // Lire les valeurs toutes les 1000ms
// setInterval(async function () {
//     try {
//         const data = await client.readCoils(514, 1); // Lire 1 registre à partir de l'adresse 514
//         console.log("Données reçues :", data.data);
//         const valeur = data.data[0] ? 1 : 0;
//         console.log("Valeur interprétée :", valeur);

//         const sql = `
//             INSERT INTO tableauvaleur (Valeur, ID_Variable, automate_ID) 
//             VALUES (?, ?, ?)
//         `;
//         const values = [valeur, 1, 1]; // a changer en fonction de l'ID variabel que l'on cherche+ ID-automate

//         // Exécuter la requête d'insertion
//         db.query(sql, values, (err, results) => {
//             if (err) {
//                 console.error("Erreur lors de l'insertion dans la BDD :", err.message);
//             } else {
//                 console.log("Données insérées avec succès. ID :", results.insertId);
//             }
//         });

//     } catch (error) {
//         console.error("Erreur lors de la lecture des données :", error.message);
//     }
// }, 1000);

async function scheduleVariableTracking() { // fais le tour de toute les variables qu'on a 
  try {
    const conn = await db.getConnection();

    // Récupérer toutes les variables avec leur fréquence
    const variables = await conn.query("SELECT * FROM variable");

    for (const variable of variables) {
      const { ID_Variable, Nom, IP, Adresse_Mot, Fréquence, ID_AUTOMATE } = variable;

      // Planifier un suivi en fonction de la fréquence
      setInterval(async () => {
        try {
          // Connexion à l'automate
          await client.connectTCP(IP, { port: 502 });
          client.setID(1);

          // Lire la valeur
          const data = await client.readCoils(parseInt(Adresse_Mot), 1);
          const valeur = data.data[0] ? 1 : 0;

          console.log(`Valeur lue pour ${Nom} (Automate ${ID_AUTOMATE}): ${valeur}`);

          // Insérer dans la table tableauvaleur
          await conn.query(
            "INSERT INTO tableauvaleur (Valeur, ID_Variable, automate_ID) VALUES (?, ?, ?)",
            [valeur, ID_Variable, ID_AUTOMATE]
          );

          console.log(`Valeur insérée pour la variable ${Nom}.`);
        } catch (error) {
          console.error(`Erreur lors de la lecture de la variable ${Nom}:`, error.message);
        }
      }, Fréquence * 1000); // Fréquence en secondes
    }

    conn.release();
  } catch (error) {
    console.error("Erreur lors de la planification des suivis :", error.message);
  }
}

// Démarrer la planification
scheduleVariableTracking();
