import AssignmentsDao from "./dao.js";

export default function AssignmentRoutes(app, db) {
  const assignmentsDao = AssignmentsDao(db);

  const findAllCourseAssignments = (req, res) => {
    const { cid } = req.params;
    const assignments = assignmentsDao.findAllCourseAssignments(cid);
    res.send(assignments);
  };
  const createAssignment = (req, res) => {
    const { cid } = req.params;
    const newAssignment = assignmentsDao.createAssignment(cid, req.body);
    res.json(newAssignment);
  };
  const deleteAssignment = (req, res) => {
    const { cid, aid } = req.params;
    const status = assignmentsDao.deleteAssignment(cid, aid);
    res.send(status);
  };
  const updateAssignment = (req, res) => {
    const { cid } = req.params;
    const assignmentUpdates = req.body;
    const status = assignmentsDao.updateAssignment(cid, assignmentUpdates);
    res.send(status);
  };

  app.get("/api/assignments/:cid", findAllCourseAssignments);
  app.post("/api/assignments/:cid/create", createAssignment);
  app.delete("/api/assignments/:cid/:aid", deleteAssignment);
  app.put("/api/assignments/:cid", updateAssignment);
}
