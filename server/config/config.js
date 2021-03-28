require('dotenv').config();

module.exports = {
  "development": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_NAME,
    "host": process.env.DB_HOST,
    "seederStorage": "sequelize",
    "seederStorageTableName": "sequelize_data",
    "dialect": "postgres"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "seederStorage": "sequelize",
    "seederStorageTableName": "sequelize_data",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "seederStorage": "sequelize",
    "seederStorageTableName": "sequelize_data",
    "dialect": "mysql"
  }
};
