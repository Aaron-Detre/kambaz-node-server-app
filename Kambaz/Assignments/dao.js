import { v4 as uuidv4 } from "uuid";
import CoursesDao from "../Courses/dao.js";
export default function AssignmentsDao() {
  const coursesDao = CoursesDao();

  const getAssignmentsForCourse = (cid) => {
    return coursesDao.findAllAssignmentsForCourse(cid);
  };

  function createAssignment(cid, assignment) {
    const newAssignment = { ...assignment, course: cid, _id: uuidv4() };
    return coursesDao.createAssignmentForCourse(cid, newAssignment);
  }
  function deleteAssignment(cid, aid) {
    return coursesDao.deleteAssignmentFromCourse(cid, aid);
  }
  function updateAssignment(cid, assignment) {
    return coursesDao.updateAssignmentForCourse(cid, assignment);
  }

  return {
    getAssignmentsForCourse,
    createAssignment,
    deleteAssignment,
    updateAssignment,
  };
}
