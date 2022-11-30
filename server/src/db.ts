import { DataSource } from "typeorm";
import Skill from "./entity/Skill";
import Wilder from "./entity/Wilder";

const datasource = new DataSource({
  type: "sqlite",
  database: "./wildersdb.sqlite",
  synchronize: true,
  entities: [Wilder, Skill],
  logging: ["query", "error"],
});

export default datasource;
