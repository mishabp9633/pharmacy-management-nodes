export function pharmacybillValidator(req, res, next) {
  // check if the "user" collection is present in the request body
  if (req.body) {
    let { prescriptionId } = req.body;

    if (!prescriptionId) {
      res.send({ message: "prescriptionId is required" });
      return;
    }
  }
  next();
}
