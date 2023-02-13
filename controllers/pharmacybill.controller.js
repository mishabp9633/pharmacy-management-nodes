import {
  Delete,
  getAll,
  getAllByTokenPatient,
  getSingle,
  saveBillData,
  updateBillData,
} from "../services/pharmacybill.service.js";
import { findDoctorId, findUserId } from "../services/priscription.service.js";

export async function save(req, res, next) {
  try {
    const billData = req.body;
    const prescriptionId = req.body.prescriptionId;
    console.log("prescriptionId", prescriptionId);
    const medicine = req.body.medicine;
    console.log("medicine", medicine);

    const { userId } = await findUserId(prescriptionId);
    console.log("userId", userId);
    if (!userId) return res.status(400).send("user not found");

    const { doctorId } = await findDoctorId(prescriptionId);
    console.log("doctorId", doctorId);
    if (!doctorId) return res.status(400).send("doctor not found");

    const pharmadcyBill = await saveBillData(
      billData,
      medicine,
      userId,
      doctorId
    );
    res.status(200).send({ success: true });
  } catch (error) {
    console.log(error);
    next(error);
  }
}

export async function getAllPharmacyBill(req, res, next) {
  try {
    const pageNumber = req.query.pageNumber || 1;
    const pageSize = req.query.pageSize || 10;
    const bill = await getAll(pageNumber, pageSize);

    res.status(200).send(bill);
  } catch (err) {
    console.log(err);
    next(err);
  }
}

export async function getPharmacybillByTokenPatient(req, res, next) {
  try {
    const patientId = req.body.patient._id;
    const Pharmacybill = await getAllByTokenPatient(patientId);

    res.status(200).send(Pharmacybill);
  } catch (err) {
    console.log(err);
    next(err);
  }
}

export async function getSinglePharmacybill(req, res, next) {
  try {
    const pharmacybillId = req.params.id;
    const Pharmacybill = await getSingle(pharmacybillId);

    res.status(200).send(Pharmacybill);
  } catch (err) {
    console.log(err);
    next(err);
  }
}

export async function deletePharmacybill(req, res, next) {
  try {
    const pharmacybillId = req.params.id;
    const Pharmacybill = await Delete(pharmacybillId);

    res.status(200).send(Pharmacybill);
  } catch (err) {
    console.log(err);
    next(err);
  }
}

export async function updatePharmacybill(req, res, next) {
  try {
    const billId = req.params.id;
    const billData = req.body;
    const prescriptionId = req.body.prescriptionId;
    console.log("prescriptionId", prescriptionId);
    const medicine = req.body.medicine;
    console.log("medicine", medicine);

    const { userId } = await findUserId(prescriptionId);
    console.log("userId", userId);
    if (!userId) return res.status(400).send("user not found");

    const { doctorId } = await findDoctorId(prescriptionId);
    console.log("doctorId", doctorId);
    if (!doctorId) return res.status(400).send("doctor not found");

    const pharmadcyBill = await updateBillData(
      billId,
      billData,
      medicine,
      userId,
      doctorId
    );
    res.status(200).send({ success: true });
  } catch (error) {
    console.log(error);
    next(error);
  }
}
