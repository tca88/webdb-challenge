exports.up = function(knex, Promise) {
  // the tables most be created in the right order,
  // tables with FK are created after the referenced table is created
  return knex.schema
    .createTable("projects", tbl => {
      tbl.increments();
      tbl.string("name", 128).notNullable();
      tbl.text("description").notNullable();
      tbl.boolean("completed").defaultTo(false);
    })
    .createTable("actions", tbl => {
      // the tracks table must be created before this table is created
      tbl.increments();

      tbl
        .integer("project_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("projects")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");

      tbl.string("description", 128).notNullable();
      tbl.text("notes").notNullable();
      tbl.boolean("completed").defaultTo(false);
    });
};

exports.down = function(knex, Promise) {
  // tables with FK must be removed before the referenced table is removed
  return knex.schema.dropTableIfExists("projects").dropTableIfExists("actions");
};
