export function stockValidator(req, res, next) {
    // check if the {"}user{"} collection is present in the request body
    if (req.body) {
      let { medicinName,noInStock,expieryDate,price,batchNo,priceOfOne} = req.body;
  
    if (!medicinName) {
      res.send({message:"medicinName is required"});
      return
    }
    if (!noInStock) {
      res.send({message:"noInStock is required"});
      return
    }
    if (!expieryDate) {
        res.send({message:"expieryDate is required"});
        return
      }
      if (!price) {
        res.send({message:"price is required"});
        return
      }
      if (!batchNo) {
        res.send({message:"batchNo is required"});
        return
      }
      if (!priceOfOne) {
        res.send({message:"priceOfOne is required"});
        return
      }     
}
    next()
}