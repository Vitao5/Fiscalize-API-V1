const express = require("express");
const cors = require("cors");

const router = require("./routes/router");

require("dotenv").config();
console.log("DB_USER:", process.env.MYSQLUSER);
console.log("DB_PASSWORD:", process.env.MYSQLPASSWORD ? "********" : "(vazio)");
console.log("DB_NAME:", process.env.MYSQLDATABASE);
console.log("DB_HOST:", process.env.MYSQLHOST);

const db = require("./db/models");

const app = express();
app.use(express.json());

const PORT = process.env.PORT;

// Middleware
app.use(express.json());
app.use(cors());
app.use('/api', router);
app.use("/users", router);
 

app._router.stack.forEach((r) => {
  if (r.route && r.route.path) {
      console.log(`Rota registrada: ${r.route.path}`);
  }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });


db.sequelize.authenticate()
.then(() => {
  console.log('/////////////////////////////////////////')
  console.log("Conexão com o banco de dados estabelecida!");
}).catch(err => {
  console.log('/////////////////////////////////////////')
  console.error("Erro ao conectar ao banco de dados:", err);
  console.log('/////////////////////////////////////////')
});


db.sequelize.sync({ force: false })
.then(()=>{
  console.log('/////////////////////////////////////////')
  console.log("Banco de dados sincronizado!");
  console.log('/////////////////////////////////////////')
}).catch(err => {
  console.log('/////////////////////////////////////////')
  console.error("Erro ao sincronizar o banco de dados:", err);
  console.log('/////////////////////////////////////////')
});
