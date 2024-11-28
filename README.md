# H-J
TP déploiement d'un système web 

Avancé 
BDD 
    automate --> Post fonctionne
    variable --> Post fonctionne
             --> on peut la voir sur historique



docker --> a fiare depuis le pc 
    installer wsl avec accès au bios windows pour activer rv? pour linux 
    installer docker + docker compose  
    installer node.js parce que pas sur les pc école 
    docker-compose.yml --> Plusieur images
        front end
            image 
            volume 
        backend 
    passer variable en paramètres (mdp/user/...)
        installer extension .env
            ignorer par github avec gitignore
                a l'intérieur mettre variable parce que 

nodemon --> pour redémarrer serveur a chaque fois 


installer mariadb dans conteneur docker 

nodecron --> https://www.npmjs.com/package/node-cron
    timer comme dans jenkins 
    faire un console log a l'intérieur pour voir si ca fonctionne (aparait dans terminal toutes les 10s si choisi)


git branch 
git checkout --> sortir de la branche actuelle 

faire la différence entre le frotn et le back 

installer nodedemon --> https://www.npmjs.com/package/nodemon
    redémarrage de serveur après chaque changement 
    git push origin branchquetuveux  

npm install modbus-serial



coils boolean lampe 
holding register entier /autre temp 
AU logique inversé 

donc connexion.js est capable de lire les data (en 8 bits)
    Données reçues : [ true,  false, false, false, false, false, false, false ]
    donc la on lit l'arret d'urgence et donc on peut coi que le 1er bit est true donc il est à 1

    