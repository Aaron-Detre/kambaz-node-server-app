import EnrollmentsDao from "../Enrollments/dao.js";
import model from "./model.js";
import { v4 as uuidv4 } from "uuid";

export default function CoursesDao() {
  async function findCoursesForEnrolledUser(userId) {
    const enrollmentsDao = EnrollmentsDao();
    const enrollments = await enrollmentsDao.findCoursesForUser(userId);
    const courses = await findAllCourses();
    const enrolledCourses = courses.filter((course) =>
      enrollments.some(
        (enrollment) =>
          enrollment.user === userId && enrollment.course === course._id
      )
    );
    return enrolledCourses;
  }

  function findAllCourses() {
    return model.find({}, { name: 1, description: 1, image: 1 });
  }

  function createCourse(course) {
    const newCourse = { ...course, _id: uuidv4() };
    return model.create(newCourse);
  }

  function deleteCourse(courseId) {
    return model.deleteOne({ _id: courseId });
  }

  function updateCourse(courseId, courseUpdates) {
    return model.updateOne({ _id: courseId }, { $set: courseUpdates });
  }

  async function findAllAssignmentsForCourse(courseId) {
    const course = await model.findOne({ _id: courseId });
    return course.assignments;
  }

  async function createAssignmentForCourse(courseId, assignment) {
    return model.updateOne(
      { _id: courseId },
      { $push: { assignments: assignment } }
    );
  }

  async function deleteAssignmentFromCourse(courseId, assignmentId) {
    return model.updateOne(
      { _id: courseId },
      { $pull: { assignments: { _id: assignmentId } } }
    );
  }

  async function updateAssignmentForCourse(courseId, updatedAssignment) {
    return model.updateOne(
      { _id: courseId, "assignments._id": updatedAssignment._id },
      { $set: { "assignments.$": updatedAssignment } }
    );
  }

  return {
    findAllCourses,
    findCoursesForEnrolledUser,
    createCourse,
    deleteCourse,
    updateCourse,
    findAllAssignmentsForCourse,
    createAssignmentForCourse,
    deleteAssignmentFromCourse,
    updateAssignmentForCourse,
  };
}
