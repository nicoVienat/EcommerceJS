var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var kinderSchema = new Schema({
    kinderId: Number,
    name: String,
    description : String,
    imageURL: String,
    type: String,
    price: Number
});

var kinderModel = mongoose.model('Kinder', kinderSchema);

kinderModel.find({}).then(
    function(kinders){
        if (kinders.length == 0) {
            var kinder1 = new kinderModel({
                kinderId: 14061995,
                name: 'Kinder Surprise',
                description: 'KINDER SURPRISE c\'est un œuf unique qui renferme toute la saveur du chocolat KINDER, associée à un effet de surprise, et un cadeau toujours nouveau.',
                imageURL: './public/img/kinder_surprise.jpg',
                type: 'Surprise',
                price: 5
            });
            var kinder2 = new kinderModel({
                kinderId: 10195,
                name: 'Kinder Bueno',
                description: 'Kinder Bueno c\'est une barre délicieusement chocolatée au bon cœur au lait et aux noisettes. Croustillant, fondant, irrésistible…',
                imageURL: './public/img/kinder_bueno.jpg',
                type: 'Bueno',
                price: 50
            });
            var kinder3 = new kinderModel({
                kinderId: 55555,
                name: 'Kinder Maxi',
                description: 'Kinder Maxi, c\'est un grand cœur au lait délicieusement fondant dans une barre de tendre chocolat KINDER. Emballé individuellement, Kinder Maxi est facile à transporter. Il est le doux plaisir indispensable pour se détendre dans un quotidien rempli !',
                imageURL: './public/img/kinder_maxi.png',
                type: 'Maxi',
                price: 2
            });
            var kinder4 = new kinderModel({
                kinderId: 14,
                name: 'Kinder Country',
                description: 'Kinder Country est l\'allié plaisir au chocolat et aux céréales idéal pour bien poursuivre votre journée. L\'alliance unique du croustillant des céréales soufflées et du fondant du chocolat KINDER… Parce que se faire plaisir, c\'est aussi recharger ses batteries.',
                imageURL: './public/img/kinder_country.jpg',
                type: 'Country',
                price: 7
            });
            var kinder5 = new kinderModel({
                kinderId: 1999995,
                name: 'Kinder Mini',
                description: 'Il y a des moments dans la journée ou j\'aime m\'offrir des petits moments de Plaisir. Et c\'est encore mieux s\'ils sont partagés entre amis. <br\> Aujourd\'hui, pour tous ces petits moments, il y a la gamme Kinder Mini : de délicieuses petites bouchées à s\'offrir ou à partager pour une pause plaisir conviviale.',
                imageURL: './public/img/kinder_mini.jpg',
                type: 'Mini',
                price: 42
            });
            var kinder6 = new kinderModel({
                kinderId: 61,
                name: 'Kinder Shoko-Bons',
                description: 'Kinder Schoko-Bons, c\'est un bonbon de chocolat qui procure un vrai plaisir gourmand aux enfants comme aux adultes grâce à sa recette unique qui allie le bon goût du chocolat KINDER, un cœur au lait fondant et des éclats de noisettes croquantes.',
                imageURL: './public/img/kinder_chocobon.jpg',
                type: 'Schoko-bons',
                price: 500
            });

            kinder1.save(function (err, chair) {
                kinder2.save(function () {
                    kinder3.save(function () {
                        kinder4.save(function () {
                            kinder5.save(function () {
                                kinder6.save(function () {
                                });
                            });
                        });
                    });
                });
            });
        }
    },
    function (err) {
        console.log(err);
    });

module.exports = kinderModel;