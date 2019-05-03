const db = require("../data/dbConfig.js");

module.exports = {
  getActions,
  getById,
  addAction,
  update,
  remove
};

function getActions() {
  return db("actions");
}

function getById(id) {
  return db("actions")
    .where({ id })
    .first();
}

function addAction(action) {
  // passing 'id' as the second parameter is recommended to ensure the id is returned
  // when connecting to other database management systems like Postgres
  return db("actions")
    .insert(action, "id")
    .then(([id]) => {
      return getById(id);
    });
}

function update(id, changes) {
  return db("actions")
    .where({ id })
    .update(changes)
    .then(count => {
      if (count > 0) {
        return getById(id);
      } else {
        return null;
      }
    });
}

function remove(id) {
  return db("actions")
    .where({ id })
    .del();
}
