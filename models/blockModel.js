const mongoose = require("mongoose");
const Schema = mongoose.Schema;
schema.set("validateBeforeSave", false);

const blockSchema = new Schema({
  postalcode: {
    type: Number,
    required: true,
    unique: true,
  },
  capacity_kwp: {
    type: Number,
    required: true,
  },
  status: String,
  projectmanager: String,
  constructiondate: String,
  TnCdate: String,
  turnondate: String,
  TnCreport_doc: String,
  asbulit_doc: String,
  timestamps: true,
});

module.exports = mongoose.model("Block", blockSchema);
