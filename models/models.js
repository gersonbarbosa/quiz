var path = require('path');
var Sequelize = require('sequelize');


//Cargar modelo ORM
var sequelize = new Sequelize(
  null,
  null,
  null,
  {dialect: "sqlite", storage:"quiz.sqlite"}
);

//importar la definicion de la tabla Quiz en quiz.js
var Quiz = sequelize.import(path.join(__dirname,'quiz'));

exports.Quiz = Quiz; //exportar la definicion de tabla quiz

//sequelize.sync() crea e inicializa tabla de preguntas en DB
sequelize.sync().success(function(){
  //success(..) ejecuta el manejador una vez creada la tabla
  Quiz.count().success(function(count){
    if(count===0){
      Quiz.create({
        pregunta:'Capital de Italia',
        respuesta:'Roma'
      })
      .success(function(){console.log('Base de datos inicializada')});
    };
  });
});