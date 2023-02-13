import { isValidMobileNumber, isValidEmail } from "../utils/util.js";

export function doctorValidation(req, res, next) {
  // check if the "user" collection is present in the request body
  if (req.body.user) {
    let { username, password, name, mobileNo, email, place, role } =
      req.body.user;

    //check if all the fields are present and their values are correct
    if (!username) {
      res.send({ message: "Username is required" });
      return;
    }
    if (!password) {
      res.send({ message: "password is required" });
      return;
    }
    if (!name) {
      res.send({ message: "Name is required" });
      return;
    }

    if (!mobileNo) {
      res.send({ message: "Mobile No is required" });
      return;
    }
    if (!isValidMobileNumber(mobileNo)) {
      res.send({ message: "Your mobile number not match required format" });
      return;
    }
    if (!email) {
      res.send({ message: "Email is required" });
      return;
    }
    if (!isValidEmail(email)) {
      res.send({ message: "Your email address not match required format" });
      return;
    }
    if (!place) {
      res.send({ message: "Place is required" });
      return;
    }
    if (!role) {
      res.send({ message: "Role is required" });
      return;
    }
  }
  // check if the "doctor" collection is present in the request body
  if (req.body.doctor) {
    let { department, timeStart, timeEnd, qualification, yearofExperience } =
      req.body.doctor;

    //check if all the fields are present and their values are correct

    if (!department) {
      res.send({ message: "department is required" });
      return;
    }
    if (!timeStart) {
      res.send({ message: "timeStart is required" });
      return;
    }
    if (!timeEnd) {
      res.send({ message: "timeEnd is required" });
      return;
    }
    if (!qualification) {
      res.send({ message: "qualification is required" });
      return;
    }
    if (!yearofExperience) {
      res.send({ message: "yearofExperience is required" });
      return;
    }
  }
  next();
}
