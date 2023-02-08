import { loginValidator } from "../middlewares/login.validation.middleware.js";
import { Delete } from "../services/stock.service.js";
import {
  getSingle,
  findUserById,
  update as updateUser
} from "../services/user.service.js";


export async function updateUserByToken(req, res, next) {

  try {

    let userId = req.body.patient._id
    console.log("userId",userId);
    let {user} = await findUserById(userId);
    if (!user) return res.status(400).send({ message: "user not found" })

    if (user) {
      const userData = req.body.user

      await updateUser(
        userId,
        userData)
    }

    console.log('user',user);
    res.status(200).send({ success: true });
  } catch (err) {
    console.log(err);
    next(err);
  }
}



export async function getUserDetailsByToken(req, res, next) {
    const userId = req.body.patient._id
    try {
      const userDetails = await getSingle(userId);
      res.status(200).send(userDetails);
    } catch (err) {
      next(err);
    }
  }


  export async function deleteUserByToken(req, res, next) {
    const userId = req.body.patient._id
    try {
      const userDetails = await Delete(userId);
      res.status(200).send(userDetails);
    } catch (err) {
      next(err);
    }
  }