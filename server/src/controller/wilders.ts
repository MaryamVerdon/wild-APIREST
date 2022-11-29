import { Like } from "typeorm";
import db from "../db";
import Skill from "../entity/Skill";
import Wilder from "../entity/Wilder";
import { Controller } from "../types/Controller";

const wildersController: Controller = {
  create: async (req, res) => {
    const { name } = req.body;
    if (name.length > 100 || name.length === 0) {
      return res
        .status(422)
        .send("the name should have a length between 1 and 100 characters");
    }

    try {
      const created = await db.getRepository(Wilder).save({ name });
      res.status(201).send(created);
    } catch (err) {
      console.error(err);
      res.status(500).send("error while creating wilder");
    }
  },
  read: async (req, res) => {
    const { nameContains } = req.query;
    try {
      const wilders = await db.getRepository(Wilder).find({
        where: {
          name:
            typeof nameContains === "string"
              ? Like(`%${nameContains}%`)
              : undefined,
        },
      });
      res.send(wilders);
    } catch (err) {
      console.error(err);
      res.status(500).send("error while reading wilders");
    }
  },
  update: async (req, res) => {
    const { name } = req.body;
    if (name.length > 100 || name.length === 0) {
      return res
        .status(422)
        .send("the name should have a length between 1 and 100 characters");
    }

    try {
      const { affected } = await db
        .getRepository(Wilder)
        .update(req.params.id, req.body);
      if (affected !== 0) return res.send("wilder updated");
      res.sendStatus(404);
    } catch (err) {
      console.error(err);
      res.status(500).send("error while updating wilder");
    }
  },
  delete: async (req, res) => {
    try {
      const { affected } = await db.getRepository(Wilder).delete(req.params.id);
      if (affected !== 0) return res.send("wilder deleted");
      res.sendStatus(404);
    } catch (err) {
      console.error(err);
      res.status(500).send("error while deleting wilder");
    }
  },
  addSkill: async (req, res) => {
    const { wilderId } = req.params;
    const { skillId } = req.body;

    try {
      const wilderToUpdate = await db
        .getRepository(Wilder)
        .findOneBy({ id: parseInt(wilderId, 10) });

      if (wilderToUpdate === null)
        return res.status(404).send("wilder not found");

      const skillToAdd = await db
        .getRepository(Skill)
        .findOneBy({ id: skillId });

      if (skillToAdd === null) return res.status(404).send("skill not found");

      wilderToUpdate.skills = [...wilderToUpdate.skills, skillToAdd];

      await db.getRepository(Wilder).save(wilderToUpdate);

      res.send("skill added to wilder");
    } catch (err) {
      console.error(err);
      res.status(500).send("error adding skill to wilder");
    }
  },
  removeSkill: async (req, res) => {
    const { wilderId } = req.params;
    const { skillId } = req.params;
    try {
      const skillToRemove = await db
        .getRepository(Skill)
        .findOneBy({ id: parseInt(skillId, 10) });

      if (skillToRemove === null)
        return res.status(404).send("skill not found");

      const wilderToUpdate = await db
        .getRepository(Wilder)
        .findOneBy({ id: parseInt(wilderId, 10) });

      if (wilderToUpdate === null)
        return res.status(404).send("wilder not found");

      console.log(wilderToUpdate);

      wilderToUpdate.skills = wilderToUpdate.skills.filter(
        (skill) => skill.id.toString() !== skillToRemove.id.toString()
      );

      await db.getRepository(Wilder).save(wilderToUpdate);

      res.status(200).send("skill removed from wilder");
    } catch (error) {
      console.error(error);
      res.status(500).send("error while removing skill");
    }
  },
};

export default wildersController;
