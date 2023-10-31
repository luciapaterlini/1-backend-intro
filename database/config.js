const mongoose = require("mongoose");

// funcion asincrona
const dbConnection = async () => { 
    try{
        await mongoose.connect(process.env.MONGODB_CNN);
        console.log("Base de datos conectada");
    } catch(error){ 
        console.log(error);
        throw new Error("Error en el inicio de la Base de Datos") 
    }
};

module.exports = {
    dbConnection,
};
