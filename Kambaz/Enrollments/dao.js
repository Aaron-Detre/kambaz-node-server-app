import { v4 as uuidv4 } from "uuid";
export default function EnrollmentsDao(db) {
  function fetchUserEnrollments(userId) {
    return db.enrollments.filter((e) => e.user === userId);
  }
  function enrollUserInCourse(userId, courseId) {
    const newEnrollment = { _id: uuidv4(), user: userId, course: courseId };
    db.enrollments.push(newEnrollment);
    return newEnrollment;
  }
  function unenrollUserInCourse(userId, courseId) {
    const { enrollments } = db;
    db.enrollments = enrollments.filter(
      (e) => e.user !== userId || e.course !== courseId
    );
  }
  return { fetchUserEnrollments, enrollUserInCourse, unenrollUserInCourse };
}
