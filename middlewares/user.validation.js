import { isValidMobileNumber ,isValidEmail} from "../utils/util.js";


export function userValidation(req, res, next) {

    // check if the "user" collection is present in the request body
    if (req.body.user) {
      let { username, password, name, mobileNo, email,place} = req.body.user;
  
      //check if all the fields are present and their values are correct
      if (!username) {
        res.send({message:"Username is required"});
        return
      }
      if (!password) {
        res.send({message:"password is required"});
        return
      }
      if (!name) {
        res.send({message:"name is required"});
        return
      }
  
      if (!mobileNo) {
        res.send({message:"mobileNo is required"});
        return
      }
      if (!isValidMobileNumber(mobileNo)) {
        res.send({message:"your mobile number not match required format"});
        return
      }
      if (!email) {
        res.send({message:"email is required"});
        return
      }
      if (!isValidEmail(email)) {
        res.send({message:"your email address not match required format"});
        return
      }
      if (!place) {
        res.send({message:"place is required"});
        return
      }
    }
    
    next();
  }