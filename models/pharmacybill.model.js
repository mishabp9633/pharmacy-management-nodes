import mongoose from 'mongoose'


const pharmacybillSchema = new mongoose.Schema({
    patientName:{
        type:String,
        required:true
    },     
    doctorName:{
        type:String,
        required:true
    },
    medicine:[
        {
          stockId: {
            type: String,
            ref:"Stock"
          },
          quantity: {
            type: Number,
            default: 0
          }
        }
      ],
      totalPrice:{
        type:Number,
        default:0
      }
    // stockId:[{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:'Stock'
    // }]

},{timestamps:true})

export const pharmacybillModel = mongoose.model("Pharmacybill",pharmacybillSchema)

