# Utiliser une image officielle de Node.js
FROM node:14

# Définir le répertoire de travail à l'intérieur du conteneur
WORKDIR /app

# Copier les fichiers package.json et package-lock.json pour installer les dépendances
COPY package.json ./

# Installer les dépendances globales nécessaires (comme nodemon)
RUN npm install -g nodemon

# Installer les dépendances du projet
RUN npm install

# Copier tous les fichiers du projet dans le conteneur
COPY . .

# Exposer le port 5000 pour que Docker sache sur quel port fonctionne l'application
EXPOSE 5000

# Démarrer l'application avec nodemon
CMD ["nodemon", "app.js"]
