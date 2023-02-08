import userModel from '../models/user.model.js'


export async function getAll() {
    const pharmacyList = await userModel.find({role:'pharmacist'},{},{projection:{password:0}})
    return {pharmacyList}
}


export async function getSingle(pharmacyId) {
    const pharmacist = await userModel
      .findById(pharmacyId,{},{projection:{password:0}})
    console.log(pharmacist);
    return { pharmacist };
  }


  export async function updatePharmacist(pharmacistId, pharmacistData) {
 
    const userProfile = await userModel.findByIdAndUpdate(pharmacistId, pharmacistData,
  
      {
        new: true,
      }
    );
    return { userProfile }
    
  }