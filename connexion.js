const wifi = require('node-wifi');
const ModbusRTU = require("modbus-serial");

// Initialiser le module WiFi
wifi.init({
    iface: null // Null pour utiliser l'interface par défaut
});

// Détails de la connexion WiFi
const ssid = "API 5Ghz";
const password = "Happywifi";

// Adresse IP de l'automate et port Modbus TCP (502 par défaut)
const automateIP = "172.16.1.26";
const port = 502;

// Fonction pour se connecter au WiFi
async function connecterWifi() {
    try {
        console.log("Connexion au WiFi...");
        await wifi.connect({ ssid: ssid, password: password });
        console.log(`Connecté au WiFi : ${ssid}`);
    } catch (error) {
        console.error("Erreur lors de la connexion au WiFi :", error.message || error);
        throw error; // Stoppe l'exécution si la connexion échoue
    }
}

// Fonction pour lire une variable via Modbus TCP
async function lireVariable() {
    const client = new ModbusRTU();
    try {
        // Connexion à l'automate
        await client.connectTCP(automateIP, { port });
        console.log("Connecté à l'automate :", automateIP);

        // Définir l'ID de l'unité (souvent 1 par défaut, vérifiez dans votre automate)
        client.setID(1);

        // Lire les registres de l'automate
        // Exemple : Lire 2 registres à partir de l'adresse 0
        const data = await client.readHoldingRegisters(0, 2);

        // Affiche les données reçues
        console.log("Valeurs lues :", data.data);

        // Fermez la connexion après la lecture
        client.close();
    } catch (error) {
        console.error("Erreur lors de la lecture de la variable :", error.message);
    }
}

// Fonction principale
async function main() {
    try {
        // Étape 1 : Se connecter au WiFi
        await connecterWifi();

        // Étape 2 : Lire les variables de l'automate
        await lireVariable();
    } catch (error) {
        console.error("Erreur dans l'exécution principale :", error.message);
    }
}

// Lancer le programme
main();
