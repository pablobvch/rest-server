const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../database/mongoose");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.paths = {
      auth: "/api/auth",
      buscar: "/api/buscar",
      categorias: "/api/categorias",
      usuarios: "/api/usuarios",
      productos: "/api/productos"
    };
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
    this.app.use(this.paths.auth, require("../routes/auth"));
    this.app.use(this.paths.buscar, require("../routes/buscar"));
    this.app.use(this.paths.usuarios, require("../routes/usuarios"));
    this.app.use(this.paths.categorias, require("../routes/categorias"));
    this.app.use(this.paths.productos, require("../routes/productos"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Rest server corriendo en puerto", this.port);
    });
  }
}

module.exports = Server;
