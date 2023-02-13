import {
  getAll,
  save,
  getSingle,
  Delete,
  update,
} from "../services/stock.service.js";

export async function saveStock(req, res, next) {
  try {
    const stockData = req.body;
    const stock = await save(stockData);
    console.log(stock);
    res.status(200).send(stock);
  } catch (err) {
    console.log(err);
    next(err);
  }
}

export async function getAllStock(req, res, next) {
  try {
    const stock = await getAll();

    res.status(200).send(stock);
  } catch (err) {
    console.log(err);
    next(err);
  }
}

export async function getSingleStock(req, res, next) {
  try {
    const stockId = req.params.id;
    const stock = await getSingle(stockId);

    res.status(200).send(stock);
  } catch (err) {
    console.log(err);
    next(err);
  }
}

export async function deleteStoke(req, res, next) {
  try {
    const stockId = req.params.id;
    const stock = await Delete(stockId);

    res.status(200).send(stock);
  } catch (err) {
    console.log(err);
    next(err);
  }
}

export async function updateStoke(req, res, next) {
  try {
    const stockId = req.params.id;
    const stockData = req.body;
    const stock = await update(stockId, stockData);

    res.status(200).send(stock);
  } catch (err) {
    console.log(err);
    next(err);
  }
}
