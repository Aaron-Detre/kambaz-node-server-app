import EnrollmentsDao from "./dao.js";

export default function EnrollmentsRoutes(app, db) {
  const enrollmentsDao = EnrollmentsDao(db);

  const fetchUserEnrollments = (req, res) => {
    const { uid } = req.params;
    const enrollments = enrollmentsDao.fetchUserEnrollments(uid);
    res.json(enrollments);
  };
  const enrollUserInCourse = (req, res) => {
    const { uid, cid } = req.params;
    const newEnrollment = enrollmentsDao.enrollUserInCourse(uid, cid);
    res.json(newEnrollment);
  };
  const unenrollUserInCourse = (req, res) => {
    const { uid, cid } = req.params;
    const status = enrollmentsDao.unenrollUserInCourse(uid, cid);
    res.send(status);
  };

  app.get("/api/enrollments/:uid", fetchUserEnrollments);
  app.post("/api/enrollments/:uid/:cid", enrollUserInCourse);
  app.delete("/api/enrollments/:uid/:cid", unenrollUserInCourse);
}
