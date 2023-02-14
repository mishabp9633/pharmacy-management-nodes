import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";
import doctorModel from "../models/doctor.model.js"

export async function verifyUser(req, res, next) {
    const token = req.header('Authorization') && req.header('Authorization').split('Bearer ')[1] || null;

    if (!token) {
        return res.status(401).send({ message: "Access denied.No token provided" })
    }
    try {

        const decoded = jwt.verify(token, process.env.TOKEN_KEY)
        const user = await userModel.findOne({ _id: decoded._id })
        console.log('user:', user._id);
        req.body.user = user
        next()
    } catch (error) {
        return res.status(400).send({ message: "Invalid token" })
    }
}


export async function patientMiddleware(req, res, next) {
    const token = req.header('Authorization') && req.header('Authorization').split('Bearer ')[1] || null;

    if (!token) {
        return res.status(401).send({ message: "Access denied.No token provided" })
    }
    try {

        const decoded = jwt.verify(token, process.env.TOKEN_KEY)
        const user = await userModel.findOne({ _id: decoded._id })
        console.log('user:', user._id);

        if (user.role != 'patient')
            return res.status(403).send({ message: 'Access denied . Not an patient' })
            
        req.body.patient = user
        next()
    } catch (error) {
        return res.status(400).send({ message: "Invalid token" })
    }
}


export async function adminMiddleware(req, res, next) {
    const token = req.header('Authorization') && req.header('Authorization').split('Bearer ')[1] || null;

    if (!token) {
        return res.status(401).send({ message: "Access denied.No token provided" })
    }
    try {

        const decoded = jwt.verify(token, process.env.TOKEN_KEY)
        const user = await userModel.findOne({ _id: decoded._id })
        console.log('user:', user._id);

        if (user.role != 'admin')
            return res.status(403).send({ message: 'Access denied . Not an admin' })
            
            req.body.admin = user
            next()
        
    } catch (error) {
        return res.status(400).send({ message: "Invalid token" })
    }
}



export async function doctorMiddleware(req, res, next) {
    const token = req.header('Authorization') && req.header('Authorization').split('Bearer ')[1] || null;

    if (!token) {
        return res.status(401).send({ message: "Access denied. No token provided" })
    }

    try {
        const decoded = jwt.verify(token, process.env.TOKEN_KEY)
        const user = await userModel.findOne({ _id: decoded._id })

        if (!user) {
            return res.status(400).send({ message: 'Invalid user' })
        }

        if (user.role != 'doctor') {
            return res.status(403).send({ message: 'Access denied. Not an doctor' })
        }

        req.body.doctor = user
        next()
    } catch (error) {
        console.log(error);
        return res.status(400).send({ message: "Invalid token" })
    }
}



export async function pharmacistMiddleware(req, res, next) {
    const token = req.header('Authorization') && req.header('Authorization').split('Bearer ')[1] || null;

    if (!token) {
        return res.status(401).send({ message: "Access denied.No token provided" })
    }
    try {

        const decoded = jwt.verify(token, process.env.TOKEN_KEY)
        const user = await userModel.findOne({ _id: decoded._id })
        console.log('user:', user._id);

        if (user.role != 'pharmacist')
            return res.status(403).send({ message: 'Access denied . Not an pharmacist' })
        req.body.pharmacist = user
        next()
    } catch (error) {
        return res.status(400).send({ message: "Invalid token" })
    }
}

//single checking
export async function roleCheckMiddleware(req, res, next) {
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

