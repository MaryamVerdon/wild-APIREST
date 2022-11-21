const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "Wilders",
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
});
