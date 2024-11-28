from pymodbus.client.sync import ModbusTcpClient
import mysql.connector

# Configuration de l'automate (Modbus Server)
MODBUS_SERVER_IP = "172.16.1.23"  # Adresse IP de l'automate
MODBUS_PORT = 502  # Port Modbus par défaut

# Connexion à MariaDB
db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="votre_mot_de_passe",  # Remplace par ton mot de passe MariaDB
    database="votre_base"  # Remplace par le nom de ta base
)
cursor = db.cursor()

# Connexion au Modbus Server
client = ModbusTcpClient(MODBUS_SERVER_IP, port=MODBUS_PORT)

if client.connect():
    print("Connexion Modbus réussie")

    # Lire des Holding Registers (ex. Température)
    registers = client.read_holding_registers(0, 5)  # Lire 5 registres à partir de l'adresse 0
    if not registers.isError():
        valeurs_registers = registers.registers
        print(f"Valeurs des registres : {valeurs_registers}")

        # Enregistrer les valeurs dans MariaDB
        for i, valeur in enumerate(valeurs_registers):
            query = """
                INSERT INTO variables (nom_variable, adresse_modbus, type_donnee, valeur_actuelle)
                VALUES (%s, %s, %s, %s)
                ON DUPLICATE KEY UPDATE valeur_actuelle = VALUES(valeur_actuelle), timestamp = CURRENT_TIMESTAMP
            """
            cursor.execute(query, (f"Register_{i}", i, "REGISTER", valeur))
        db.commit()
        print("Données des registres insérées dans MariaDB")
    else:
        print("Erreur lors de la lecture des registres")

    # Lire des Coils (ex. Voyants)
    coils = client.read_coils(0, 10)  # Lire 10 coils à partir de l'adresse 0
    if not coils.isError():
        print(f"État des Coils : {coils.bits}")

        # Enregistrer l'état des Coils dans MariaDB
        for i, etat in enumerate(coils.bits):
            query = """
                INSERT INTO variables (nom_variable, adresse_modbus, type_donnee, valeur_actuelle)
                VALUES (%s, %s, %s, %s)
                ON DUPLICATE KEY UPDATE valeur_actuelle = VALUES(valeur_actuelle), timestamp = CURRENT_TIMESTAMP
            """
            cursor.execute(query, (f"Coil_{i}", i, "COIL", int(etat)))
        db.commit()
        print("Données des Coils insérées dans MariaDB")
    else:
        print("Erreur lors de la lecture des Coils")

    # Fermer les connexions
    client.close()
    db.close()
else:
    print("Échec de connexion au serveur Modbus")
