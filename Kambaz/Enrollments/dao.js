import model from "./model.js";

export default function EnrollmentsDao() {
  async function findCoursesForUser(userId) {
    const enrollments = await model.find({ user: userId }).populate("course");
    return enrollments.map((enrollment) => enrollment.course);
  }
  async function findUserEnrollments(userId) {
    return model.find({ user: userId });
  }
  async function findUsersForCourse(courseId) {
    const enrollments = await model.find({ course: courseId }).populate("user");
    return enrollments.map((enrollment) => enrollment.user);
  }
  function enrollUserInCourse(userId, courseId) {
    return model.create({
      user: userId,
      course: courseId,
      _id: `${userId}-${courseId}`,
    });
  }
  function unenrollUserInCourse(user, course) {
    return model.deleteOne({ user, course });
  }
  function unenrollAllUsersFromCourse(courseId) {
    return model.deleteMany({ course: courseId });
  }

  return {
    findCoursesForUser,
    findUserEnrollments,
    findUsersForCourse,
    enrollUserInCourse,
    unenrollUserInCourse,
    unenrollAllUsersFromCourse,
  };
}
