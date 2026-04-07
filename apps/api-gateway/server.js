const http = require('http');
require("dotenv").config();

const app = require('./app');
const sequelize = require("./src/config/db");

const PORT = process.env.PORT || 3000;
const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`API Gateway is running on port ${PORT}`);
});
sequelize.authenticate()
  .then(() => {
    console.log("PostgreSQL Connected ✅");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("DB Connection Failed ❌", err);
  });
