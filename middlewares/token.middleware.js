export function tokenValidator(req, res, next) {
  // check if the "user" collection is present in the request body
  if (req.body) {
    let { allocatedToken } = req.body;

    if (!allocatedToken) {
      res.send({ message: "allocated Token is required" });
      return;
    }
  }
  next();
}
