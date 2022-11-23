const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "Wilder",
  columns: {
    id: {
      type: "int",
      primary: true,
      generated: true,
    },
    name: {
      type: "text",
    },
  },
  relations: {
    skills: {
      target: "Skill",
      type: "many-to-many",
      joinTable: true,
      eager: true,
    },
  },
});
