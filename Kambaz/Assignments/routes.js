import AssignmentsDao from "./dao.js";

export default function AssignmentRoutes(app, db) {
  const assignmentsDao = AssignmentsDao(db);

  const getAssignmentsForCourse = async (req, res) => {
    const { cid } = req.params;
    const assignments = await assignmentsDao.getAssignmentsForCourse(cid);
    res.json(assignments);
  };
  const createAssignment = async (req, res) => {
    const { cid } = req.params;
    const newAssignment = await assignmentsDao.createAssignment(cid, req.body);
    res.json(newAssignment);
  };
  const deleteAssignment = async (req, res) => {
    const { cid, aid } = req.params;
    const status = await assignmentsDao.deleteAssignment(cid, aid);
    res.send(status);
  };
  const updateAssignment = async (req, res) => {
    const { cid } = req.params;
    const assignmentUpdates = req.body;
    const status = await assignmentsDao.updateAssignment(
      cid,
      assignmentUpdates
    );
    res.send(status);
  };

  app.get("/api/assignments/:cid", getAssignmentsForCourse);
  app.post("/api/assignments/:cid/create", createAssignment);
  app.delete("/api/assignments/:cid/:aid", deleteAssignment);
  app.put("/api/assignments/:cid", updateAssignment);
}
