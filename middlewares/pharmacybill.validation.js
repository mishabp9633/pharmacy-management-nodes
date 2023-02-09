export function pharmacybillValidator(req, res, next) {
    // check if the "user" collection is present in the request body
    if (req.body) {
      let {patientName,doctorName,totalPrice} = req.body

      if (!patientName) {
        res.send({message:"patient name is required"});
        return
      }

      if (!doctorName) {
        res.send({message:"doctor name required"});
        return
      }

      if (!totalPrice) {
        res.send({message:"total price required"});
        return
      }
      
}
if (req.body.medicine) {
    let {stockId,quantity} = req.body
    if (!stockId) {
        res.send({message:"stockId name required"});
        return
      }

      if (!quantity) {
        res.send({message:"quantity price required"});
        return
      }
    next()
}
}