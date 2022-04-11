const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      /*useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false*/
    });
  } catch (error) {
    console.log(error);
    throw new Error("Error en la base");
  }

  console.log("Base de datos Conectada");
};

module.exports = { dbConnection };
