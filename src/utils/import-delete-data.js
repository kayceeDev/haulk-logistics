const dotenv = require('dotenv');
const { shipmentModel, categoryModel,statusModel,inventoryModel } = require('../models');
const connect = require('../db');

dotenv.config();

const DB = process.env.MONGODB_URI;

connect(DB);
// DELETE ALL DATA FROM DB
const deleteData = async () => {
  try {
    await shipmentModel.deleteMany();
    await categoryModel.deleteMany();
    await statusModel.deleteMany();
    await inventoryModel.deleteMany();
    console.log('Data successfully deleted!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  // importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}