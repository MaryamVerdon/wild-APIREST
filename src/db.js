const { DataSource } = require("typeorm");
const Skill = require("./entity/Skill");
const Wilder = require("./entity/Wilder");

const datasource = new DataSource({
  type: "sqlite",
  database: "./wildersdb.sqlite",
  synchronize: true,
  entities: [Wilder, Skill],
  logging: ["query", "error"],
});

module.exports = datasource;
