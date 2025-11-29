import EnrollmentsDao from "./dao.js";

export default function EnrollmentsRoutes(app) {
  const enrollmentsDao = EnrollmentsDao();

  const findUserEnrollments = async (req, res) => {
    const { uid } = req.params;
    const enrollments = await enrollmentsDao.findUserEnrollments(uid);
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
  const unenrollAllFromCourse = async (req, res) => {
    const { cid } = req.params;
    const status = await enrollmentsDao.unenrollAllFromCourse(cid);
    res.send(status);
  };

  app.get("/api/enrollments/:uid", findUserEnrollments);
  app.post("/api/enrollments/:uid/:cid", enrollUserInCourse);
  app.delete("/api/enrollments/:uid/:cid", unenrollUserInCourse);
  app.delete("/api/enrollments/:cid", unenrollAllFromCourse);
}
