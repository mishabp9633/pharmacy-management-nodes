import userModel from "../models/user.model.js"

//.................auth controller start................//

//finding user function (auth controller)
export async function findUser(username){
    const user = await userModel.findOne({username:username})
    return {user}
}

//finding user by Id function (auth controller)
export async function findUserById(userId){
  
    const user = await userModel.findById(userId)
    return {user}
  }

//save user (auth controller)
export async function save(data) {
  const user = new userModel(data)
  await user.save();
  return { user };
}


//update user (auth controller)
export async function update(userId, userData) {
  
  const userProfile = await userModel.findByIdAndUpdate(userId, userData,

    {
      new: true,
    }
  );
  return { userProfile } 
}


//delete user (auth controller)
export async function  Delete(userId){
    const deleteUser =  await userModel.findByIdAndDelete(userId)
    return {deleteUser}
}



//get all users (auth controller)
export async function getAll() {
  const userList = await userModel.find({role:'patient'},{},{projection:{password:0}})
  return { userList };
}


//get single user (auth controller)
export async function  getSingle(userId) {
  const user = await userModel
    .findById(userId,{},{projection:{password:0}})
  console.log(user);
  return { user };
}

//...................auth controller end..................//
