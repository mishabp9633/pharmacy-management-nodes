import {getSingle} from '../services/pharmacy.service.js'

export async function getPharmacistDetailsByToken(req, res, next) {
    const userId = req.body.pharmacist._id
    try {
      const userDetails = await getSingle(userId);
      res.send(userDetails);
    } catch (err) {
      next(err);
    }
  }