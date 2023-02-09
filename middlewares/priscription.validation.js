export function priscriptionValidator(req, res, next) {
    // check if the "user" collection is present in the request body
    if (req.body) {
      let {appoinmentId,medicinNameWithQty} = req.body

      if (!appoinmentId) {
        res.send({message:"appoinment is required"});
        return
      }
      if (!medicinNameWithQty) {
        res.send({message:"medicin name with Qty is required"});
        return
      }
      
}
    next()
}