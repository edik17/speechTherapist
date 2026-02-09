const { body } = require('express-validator');
const { validationErrorHandler } = require("../middlewares/validationResultMiddleware");

const contactValidator = [
    // 1. Validazione del NOME
    body('nome')
        .trim() // Toglie spazi all'inizio e alla fine
        .notEmpty().withMessage('Il nome è obbligatorio')
        .isLength({ min: 2, max: 100 }).withMessage('Il nome deve avere tra 2 e 100 caratteri')
        .escape(), // Pulisce caratteri pericolosi (sicurezza anti-XSS)

    // 2. Validazione dell'EMAIL
    body('email')
        .trim()
        .notEmpty().withMessage("L'email è obbligatoria")
        .isEmail().withMessage("Inserisci un indirizzo email valido")
        .normalizeEmail(), // Converte tutto in minuscolo per uniformità

    // 3. Validazione del MESSAGGIO
    body('messaggio')
        .trim()
        .notEmpty().withMessage('Il messaggio è obbligatorio')
        .isLength({ min: 10 }).withMessage('Il messaggio è troppo corto (minimo 10 caratteri)')
        .escape(),

    // 4. Middleware che blocca tutto se trova errori
    validationErrorHandler
];

module.exports = { contactValidator };