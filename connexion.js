
const ModbusRTU = require("modbus-serial");
const client = new ModbusRTU();

// Connecter au TCP
client.connectTCP("172.16.1.24", { port: 502 })
    .then(() => {
        console.log("Connexion TCP établie.");
        client.setID(1); // Définir l'ID de l'unité
    })
    .catch((error) => {
        console.error("Erreur lors de la connexion TCP :", error.message);
    });

// Lire les valeurs toutes les 1000ms
setInterval(async function () {
    try {
        const data = await client.readCoils(514, 1); // Lire 1 registre à partir de l'adresse 514
        console.log("Données reçues :", data.data);
    } catch (error) {
        console.error("Erreur lors de la lecture des données :", error.message);
    }
}, 1000);
