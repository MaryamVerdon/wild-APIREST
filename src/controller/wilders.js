const { Like } = require("typeorm");
const db = require("../db");
const Skill = require("../entity/Skill");
const Wilder = require("../entity/Wilder");

module.exports = {
  create: async (req, res) => {
    const { name } = req.body;
    if (name.length > 100 || name.length === 0) {
      return res
        .status(422)
        .send("the name should have a length between 1 and 100 characters");
    }

    /*
    db
      .getRepository(Wilder)
      .save({ name })
      .then((created) => {
        res.status(201).send(created);
      })
      .catch(() => {
        res.send('error while creating wilder');
      });
    */

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
        where: { name: nameContains ? Like(`%${nameContains}%`) : undefined },
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
      if (affected) return res.send("wilder updated");
      res.sendStatus(404);
    } catch (err) {
      console.error(err);
      res.status(500).send("error while updating wilder");
    }
  },
  delete: async (req, res) => {
    try {
      const { affected } = await db.getRepository(Wilder).delete(req.params.id);
      if (affected) return res.send("wilder deleted");
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
        .findOneBy({ id: wilderId });

      if (wilderToUpdate === null)
        return res.status(404).send("wilder not found");

      const skillToAdd = await db
        .getRepository(Skill)
        .findOneBy({ id: skillId });

      if (skillToAdd === null) return res.status(404).send("skill not found");

      //wilderToUpdate.skills.push(skillToAdd)
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
        .findOneBy({ id: skillId });

      if (skillToRemove === null)
        return res.status(404).send("skill not found");

      const wilderToUpdate = await db
        .getRepository(Wilder)
        .findOneBy({ id: wilderId });

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
