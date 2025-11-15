import CoursesDao from "./dao.js";
import EnrollmentsDao from "../Enrollments/dao.js";

export default function CourseRoutes(app, db) {
  const coursesDao = CoursesDao(db);
  const enrollmentsDao = EnrollmentsDao(db);

  const findAllCourses = (req, res) => {
    const courses = coursesDao.findAllCourses();
    res.send(courses);
  };
  const findCoursesForEnrolledUser = (req, res) => {
    let { userId } = req.params;
    if (userId === "current") {
      const currentUser = req.session["currentUser"];
      if (!currentUser) {
        res.sendStatus(401);
        return;
      }
      userId = currentUser._id;
    }
    const courses = coursesDao.findCoursesForEnrolledUser(userId);
    res.json(courses);
  };
  const createCourse = (req, res) => {
    const currentUser = req.session["currentUser"];
    const newCourse = coursesDao.createCourse(req.body);
    enrollmentsDao.enrollUserInCourse(currentUser._id, newCourse._id);
    res.json(newCourse);
  };
  const deleteCourse = (req, res) => {
    const { courseId } = req.params;
    const status = coursesDao.deleteCourse(courseId);
    res.send(status);
  };
  const updateCourse = (req, res) => {
    const { courseId } = req.params;
    const courseUpdates = req.body;
    const status = coursesDao.updateCourse(courseId, courseUpdates);
    res.send(status);
  };

  app.get("/api/courses", findAllCourses);
  app.get("/api/users/:userId/courses", findCoursesForEnrolledUser);
  app.post("/api/users/current/courses", createCourse);
  app.delete("/api/courses/:courseId", deleteCourse);
  app.put("/api/courses/:courseId", updateCourse);
}
