const { Like } = require("typeorm");
const db = require("../db");
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
    // TODO
  },
  removeSkill: async (req, res) => {
    // TODO
  },
};
