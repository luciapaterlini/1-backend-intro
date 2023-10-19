const mongoose = require("mongoose");

// funcion asincrona
const dbConnection = async () => { 
    try{
        await mongoose.connect(process.env.MONGODB_CNN);
        console.log("Base de datos conectada");
    } catch(error){ // unica situacion en la q me da error => cuando no tenga acceso a la BD
        console.log(error);
        // aparece directamente en pantalla
        throw new Error("Error en el inicio de la Base de Datos") 
    }
};

module.exports = {
    dbConnection,
};
