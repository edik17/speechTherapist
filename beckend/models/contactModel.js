module.exports = (sequelize, DataTypes) => {
    const Contact = sequelize.define("contact", {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
          // Validazione: non accettare nomi vuoti
          validate: {
            notEmpty: true
          }
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            isEmail: true // Sequelize controlla automaticamente che sia un'email valida
          }
        },
        subject: {
          type: DataTypes.STRING,
          allowNull: true, // Opzionale: l'utente può scegliere un oggetto
          defaultValue: "Richiesta informazioni dal sito"
        },
        message: {
          type: DataTypes.TEXT,
          allowNull: false,
          validate: {
            len: [10, 2000] // Minimo 10 caratteri, massimo 2000
          }
        },
        isRead: {
          type: DataTypes.BOOLEAN,
          defaultValue: false // Utile per creare una piccola dashboard dove segni i messaggi letti
        }
      },
      {
        timestamps: true // Fondamentale: ti dice esattamente QUANDO ti hanno scritto
      }
    );

    return Contact;
};