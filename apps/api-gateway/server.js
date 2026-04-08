require("dotenv").config();
const app = require('./app');
const sequelize = require("./src/config/db");
require("./src/models/user.model");

const PORT = process.env.PORT || 3000;
sequelize.authenticate()
  .then(() => {
    console.log("PostgreSQL Connected ✅");
    return sequelize.sync();
  })
  .then(() => {
    console.log("Database synced ✅");
    app.listen(PORT, () => {
      console.log(`API Gateway is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("DB Connection Failed ❌", err);
  });
