const db = require("../data/dbConfig.js");

module.exports = {
  getProjects,
  getById,
  addProject,
  update,
  remove,
  getActionsByProject
};

function getProjects() {
  return db("projects");
}

function getById(id) {
  return db("projects")
    .where({ id })
    .first();
}

function addProject(project) {
  return db("projects")
    .insert(project, "id")
    .then(([id]) => {
      return getById(id);
    });
}

function update(id, changes) {
  return db("projects")
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
  return db("projects")
    .where({ id })
    .del();
}

function getActionsByProject(projectId) {
  return db("actions as a")
    .join("projects as p", "p.id", "a.project_id")
    .select([
      "a.id as id",
      "a.description as description",
      "a.notes as notes",
      "a.completed as completed"
    ])
    .where("a.project_id", projectId);
}
