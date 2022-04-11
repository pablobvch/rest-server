const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../database/mongoose");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usuariosPath = "/api/usuarios";
    this.conectarDB();
    //Middlewares
    this.middlewares();
    this.routes();
  }

  async conectarDB() {
    await dbConnection();
  }

  middlewares() {
    //directorio public
    this.app.use(express.static("public"));
    this.app.use(cors());
    this.app.use(express.json());
  }

  routes() {
    this.app.use(this.usuariosPath, require("../routes/usuarios"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Rest server corriendo en puerto", this.port);
    });
  }
}

module.exports = Server;
