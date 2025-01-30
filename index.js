import { sequelize } from "./database/db.js";
import app from "./app.js";

/* import "./models/users.model.js";
import "./models/roles.model.js"; */

const main = async () => {
  try {
    await sequelize.sync({ force: false });
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

main();
