import { v4 as uuidv4 } from "uuid";
export default function AssignmentsDao(db) {
  const getCourseAssignments = (cid) => {
    const { assignments } = db;
    return assignments.filter((a) => a.course === cid);
  };

  function findAllCourseAssignments(cid) {
    return getCourseAssignments(cid);
  }
  function createAssignment(cid, assignment) {
    const newAssignment = { ...assignment, course: cid, _id: uuidv4() };
    db.assignments = [...db.assignments, newAssignment];
    return newAssignment;
  }
  function deleteAssignment(cid, aid) {
    const { assignments } = db;
    db.assignments = assignments.filter(
      (assignment) => assignment.course !== cid || assignment._id !== aid
    );
  }
  function updateAssignment(cid, assignment) {
    db.assignments = db.assignments.map((a) =>
      a.course === cid && a._id === assignment._id ? assignment : a
    );
    return assignment;
  }

  return {
    findAllCourseAssignments,
    createAssignment,
    deleteAssignment,
    updateAssignment,
  };
}
