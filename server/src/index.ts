import express from "express";
import db from "./db";
import wildersController from "./controller/wilders";
import skillsController from "./controller/skills";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

app.post("/wilders", wildersController.create);
app.get("/wilders", wildersController.read);
app.get("/wilders/:id", wildersController.readOne);
app.patch("/wilders/:id", wildersController.update);
app.delete("/wilders/:id", wildersController.delete);
app.post("/wilders/:wilderId/skills", wildersController.addSkill);
app.delete("/wilders/:wilderId/skills/:skillId", wildersController.removeSkill);
app.patch("/wilders/:wilderId/skills/:skillId", wildersController.updateGrade);

app.post("/skills", skillsController.create);
app.get("/skills", skillsController.read);
app.patch("/skills/:id", skillsController.update);
app.delete("/skills/:id", skillsController.delete);

async function start(): Promise<void> {
  await db.initialize();
  app.listen(4000, () => {
    console.log("server ready");
  });
}

start().catch(console.error);
