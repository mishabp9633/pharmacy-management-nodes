export function appoinmentValidator(req, res, next) {
  // check if the "user" collection is present in the request body
  if (req.body) {
    let { gender, age, doctorId, dateOfBirth } = req.body;

    if (!gender) {
      res.send({ message: "gender is required" });
      return;
    }
    if (!age) {
      res.send({ message: "age is required" });
      return;
    }
    if (!doctorId) {
      res.send({ message: "doctorId is required" });
      return;
    }
    if (!dateOfBirth) {
      res.send({ message: "Date of birth is required" });
      return;
    }
  }
  next();
}
