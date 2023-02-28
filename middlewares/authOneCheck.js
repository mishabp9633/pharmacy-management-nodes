import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";


//single checking
export async function authMiddleware(req, res, next) {
    const token = req.header('Authorization') && req.header('Authorization').split('Bearer ')[1] || null;
    if (!token) {
        return res.status(401).send({ message: "Access denied. No token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.TOKEN_KEY);
        const user = await userModel.findOne({ _id: decoded._id });
        if (!user) {
            return res.status(400).send({ message: 'Invalid user' });
        }

        switch (user.role) {
            case 'pharmacist':
                case 'admin':
                    case 'doctor':
                        case 'patient':
                        
                req.body.user = user;
                next();
                break;
            default:
                return res.status(403).send({ message: 'Access denied. Not an authorized role' });
        }
    } catch (error) {
        console.log(error);
        return res.status(400).send({ message: "Invalid token" });
    }
}


export const ROLES = {
    admin: 'admin',
    patient: 'patient',
    Merchant: 'pharmacist',
    doctor: 'doctor'
  };


const check =
  (...roles) =>
  (req, res, next) => {
    if (!req.body.user) {
        console.log(req.body.user);
        console.log(roles)
      return res.status(401).send({message:'Unauthorized'});
    }

    const hasRole = roles.find(role => req.body.user.role === role);
    if (!hasRole) {
      return res.status(403).send({message:'You are not allowed to make this request.'});
    }

    return next();
  };

export const role = { check }

