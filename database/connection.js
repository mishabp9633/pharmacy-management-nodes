import  mongoose  from 'mongoose';
mongoose.set('strictQuery', false);

const connection_string =
  "mongodb://localhost:27017/easy-pharma";


  // export let db;

  export async function initialize(){
    try{
         await mongoose.connect(connection_string)
            // db = client.db("classday");
            console.log("db connected");
        }catch(err){
           throw err;
          // console.log(err);
    }
}

  