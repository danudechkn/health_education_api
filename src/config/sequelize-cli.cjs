require("dotenv").config();

const shared = {
  username: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "",
  host: process.env.DB_HOST || "127.0.0.1",
  port: Number(process.env.DB_PORT) || 3306,
  dialect: process.env.DB_DIALECT || "mysql",
};

module.exports = {
  development: {
    ...shared,
    database: process.env.DB_NAME || "Health_DB",
  },
  test: {
    ...shared,
    database: process.env.DB_NAME || "Health_DB",
  },
  production: {
    ...shared,
    database: process.env.DB_NAME,
  },
};
