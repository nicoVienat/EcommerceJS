module.exports = function(req, res, next) {
    var number = req.body.number;
    var expiryMonth = req.body.expiryMonth;
    var expiryYear = req.body.expiryYear;
    var cryptogram = req.body.cryptogram;
    req.valid = true;
    req.message = null;

    var cryptoRegExp = /\d\d\d/g;

    if(number.toString().length !== 16){
        req.valid = false;
        req.message = "Le numéro de Carte doit être de 16 chiffres"; 
    }

    if(cryptogram.length !== 3 || !cryptogram.match(cryptoRegExp) ){
        req.valid = false; 
        req.message = "Le crypto doit contenir 3 chiffres"; 
    } 

    var sendDate = new Date(expiryYear, expiryMonth - 1);
    if (compare > sendDate) {
        req.valid = false;
        req.message = "La date d'expiration est dépassé."
    }

next();
};