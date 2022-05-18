const express = require("express");
const {
  inventoryRouter,
  statusRouter,
  categoryRouter,
  shipmentRouter,
} = require("./version1");

const app = express();

app.use("/inventory", inventoryRouter);
app.use("/category", categoryRouter);
app.use("/status", statusRouter);
app.use("/shipment", shipmentRouter);

module.exports = app;
