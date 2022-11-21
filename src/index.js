const express = require("express");
const { DataSource } = require("typeorm");
const Wilder = require("./entity/Wilder");

const datasource = new DataSource({
  type: "sqlite",
  database: "./wildersdb.sqlite",
  synchronize: true,
  entities: [Wilder],
});

const app = express();

app.get("/hello", (req, res) => {
  console.log("new request from client");
  res.send("hello");
});

async function start() {
  await datasource.initialize();
  await datasource.getRepository(Wilder).save({ name: "Dave Lopper" });
  app.listen(3000, () => {
    console.log("server ready");
  });
}

start();
