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
  startdate: String,
  constructiondate: String,
  TnCdate: String,
  turnondate: Date,
  TnCreport_doc: String,
  asbulit_doc: String,
  timestamps: {
    createdAt: "created_at",
  },
});

module.exports = mongoose.model("Block", blockSchema);
