https://github.com/Halima-alt/H-J.git-> lien a partager avec le prof en meme temps que le rapport 

# H-J
TP déploiement d'un système web 

### README.md

# H-J Application

## Table des matières
- [Introduction](#introduction)
- [Technologies utilisées](#technologies-utilisées)
- [Arborescence](#arborescence)
- [Configuration](#configuration)
- [Instructions de lancement](#instructions-de-lancement)
- [Routes API Backend](#routes-api-backend)
- [Fonctionnalités Frontend](#fonctionnalités-frontend)

---

## Introduction

H-J est une application Web permettant de gérer des variables liées à un système automatisé. L'application propose une interface utilisateur permettant d'ajouter, de modifier, de supprimer et de visualiser les variables, ainsi que d'accéder à un historique.

---

## Technologies utilisées

### Backend
- **Node.js** : Plateforme JavaScript pour construire l'API backend.
- **Express.js** : Framework pour la gestion des routes et des requêtes HTTP.
- **MariaDB** : Base de données relationnelle pour stocker les variables et leur historique.

### Frontend
- **HTML5/CSS3** : Pour la création des interfaces utilisateur.
- **JavaScript** : Pour les interactions dynamiques côté client.

### Autres outils
- **Docker** : Conteneurisation pour simplifier le déploiement.
- **dotenv** : Gestion des variables d'environnement.
- **HeidiSQL** : Gestion de la base de données.

---

## Arborescence

```
H-J/
├── Backend/
│   ├── .env                  # Variables d'environnement
│   ├── connexion.js          # Connexion à la base de données
│   ├── serveur.js            # Code serveur principal (routes API)
│   ├── Dockerfile            # Configuration Docker pour le backend
│   ├── package.json          # Dépendances Node.js
│   ├── package-lock.json     # Verrouillage des dépendances
├── BDD/
│   ├── new.sql               # Script SQL pour la structure de la base de données
├── Front/
│   ├── ajoutconfig.html      # Page pour ajouter une nouvelle variable
│   ├── config.html           # Page principale pour gérer les variables
│   ├── historique.html       # Page pour visualiser l'historique des variables
│   ├── main.html             # Dashboard principal
│   ├── Modifconfig.html      # Page pour modifier une variable
│   ├── logo.jpg              # Logo de l'application
├── logs/                     # Dossier pour les logs du backend
├── docker-compose.yml        # Orchestration Docker
├── README.md                 # Documentation du projet
```

---

## Configuration

1. **Variables d'environnement** :
   Créez un fichier `.env` dans le dossier `Backend/` et configurez les variables comme suit :
   ```
   DB_HOST=127.0.0.1
   DB_USER=root
   DB_PASSWORD=password
   DB_NAME=deploiement
   ```

2. **Base de données** :
   - Importez le script SQL `new.sql` dans votre gestionnaire MariaDB/HeidiSQL.

3. **Docker** :
   - Le fichier `docker-compose.yml` est prêt pour déployer l'application et la base de données.

---

## Instructions de lancement

### Avec Docker
1. Lancez Docker et exécutez la commande suivante dans le dossier racine :
   ```
   docker-compose up
   ```
2. L'application sera accessible à :
   - Backend : `http://localhost:3000`
   - Frontend : Ouvrez `index.html` dans un navigateur.

### Sans Docker
1. Installez Node.js et MariaDB.
2. Démarrez la base de données avec le script `new.sql`.
3. Installez les dépendances backend :
   ```bash
   cd Backend
   npm install
   ```
4. Lancez le serveur backend :
   ```bash
   node serveur.js
   ```
5. Accédez aux fichiers HTML dans le dossier `Front/` pour ouvrir l'interface utilisateur.

---

## Routes API Backend

### Variables
- **GET** `/variable` : Récupère toutes les variables.
- **GET** `/variable/:id` : Récupère une variable spécifique.
- **POST** `/variable` : Ajoute une nouvelle variable.
- **PUT** `/variable/:id` : Met à jour une variable spécifique.
- **DELETE** `/variable/:id` : Supprime une variable spécifique.

### Historique
- **GET** `/historique` : Récupère les données historiques des variables.

---

## Fonctionnalités Frontend

### Pages principales :
- **ajoutconfig.html** : Interface pour ajouter une nouvelle variable avec ses détails (nom, IP, automate, fréquence, unité).
- **config.html** : Liste les variables avec des options pour modifier ou supprimer.
- **historique.html** : Affiche l'historique des données enregistrées.
- **Modifconfig.html** : Affiche les détails d'une variable sélectionnée et permet de les modifier.
- **main.html** : Tableau de bord principal de l'application.

---

## Notes importantes

1. Assurez-vous que MariaDB fonctionne avant de démarrer le backend.
2. Modifiez les informations dans `.env` en fonction de votre environnement local ou production.
3. L'intégration Docker est recommandée pour simplifier le déploiement.

---

### Auteur
Ce projet a été conçu pour la gestion des systèmes automatisés et l'analyse des données en temps réel.
