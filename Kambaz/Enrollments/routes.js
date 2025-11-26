import EnrollmentsDao from "./dao.js";

export default function EnrollmentsRoutes(app, db) {
  const enrollmentsDao = EnrollmentsDao(db);

  const findCoursesForUser = async (req, res) => {
    const { uid } = req.params;
    const enrollments = await enrollmentsDao.findCoursesForUser(uid);
    res.json(enrollments);
  };
  const enrollUserInCourse = async (req, res) => {
    const { uid, cid } = req.params;
    const newEnrollment = await enrollmentsDao.enrollUserInCourse(uid, cid);
    res.json(newEnrollment);
  };
  const unenrollUserInCourse = async (req, res) => {
    const { uid, cid } = req.params;
    const status = await enrollmentsDao.unenrollUserInCourse(uid, cid);
    res.send(status);
  };

  app.get("/api/enrollments/:uid", findCoursesForUser);
  app.post("/api/enrollments/:uid/:cid", enrollUserInCourse);
  app.delete("/api/enrollments/:uid/:cid", unenrollUserInCourse);
}
