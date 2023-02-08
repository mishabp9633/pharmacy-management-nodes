import { isValidMobileNumber ,isValidEmail} from "../utils/util.js";


export function updateMiddleware(req, res, next) {

    // check if the "user" collection is present in the request body
    if (req.body.user) {
      let { username, name, mobileNo, email,place } = req.body.user;
  
      //check if all the fields are present and their values are correct
      if (!username) {
        res.send("Username is required");
        return
      }

      if (!name) {
        res.send("name is required");
        return
      }
  
      if (!mobileNo) {
        res.send("mobileNo is required");
        return
      }
      if (!isValidMobileNumber(mobileNo)) {
        res.send("your mobile number not match required format");
        return
      }
      if (!email) {
        res.send("email is required");
        return
      }
      if (!isValidEmail(email)) {
        res.send("your email address not match required format");
        return
      }
      if (!place) {
        res.send("place is required");
        return
      }

    }
    // check if the "doctor" collection is present in the request body
    if (req.body.doctor) {
      let { department, timeStart, timeEnd, qualification, yearofExperience } = req.body.doctor;
  
      //check if all the fields are present and their values are correct

      if (!department) {
        res.send("department is required");
        return
      }
      if (!timeStart) {
        res.send("timeStart is required");
        return
      }
      if (!timeEnd) {
        res.send("timeEnd is required");
        return
      }
      if (!qualification) {
        res.send("qualification is required");
        return
      }
      if (!yearofExperience) {
        res.send("yearofExperience is required");
        return
      }
      
    }
    next();
  }
  