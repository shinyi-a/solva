const express = require("express");
const app = express();
const Block = require("./../../models/blockModel");
// const methodOverride = require("method-override");

// app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));

//get all blocks
app.get("/all", async (req, res) => {
  const hdb = await Block.find();
  res.send(hdb);
});

//get all pending blocks
app.get("/pending", async (req, res) => {
  const hdb = await Block.find({ status: "Pending" });
  res.send(hdb);
});

//get all under construction blocks
app.get("/construction", async (req, res) => {
  const hdb = await Block.find({ status: "Construction" });
  res.send(hdb);
});

//get all waiting for testing commissioning blocks
app.get("/tnc", async (req, res) => {
  const hdb = await Block.find({ status: "Testing and Commissioning" });
  res.send(hdb);
});

//get all turned on blocks
app.get("/turnon", async (req, res) => {
  const hdb = await Block.find({ status: "Turned On" });
  res.send(hdb);
});

//get turned on blocks within the last 12 months
app.get("/graph", async (req, res) => {
  const months = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ];
  const dateNow = new Date();
  const monthNow = months[dateNow.getMonth()];
  const yearNow = dateNow.getFullYear();
  let startdate = `${yearNow - 1}-${monthNow}-01T00:00:00.000Z`;
  let enddate = `${yearNow}-${monthNow}-31T00:00:00.000Z`;
  const hdb = await Block.find({
    status: "Turned On",
    turnondate: { $gte: startdate, $lte: enddate },
  });
  res.send(hdb);
});

//to find the list of blocks under the specific project manager, id is project manager _id
app.get("/user/:id", async (req, res) => {
  const { id } = req.params;
  const hdb = await Block.find({ projectmanager: id });
  res.send(hdb);
});
//use this for view sorting/graph in user detail page or block status page
//to find the pending blocks under the specific project manager
// app.get("/user/:id/pending", async (req, res) => {
//   const { id } = req.params;
//   const hdb = await Block.find({ projectmanager: id, status: "Pending" });
//   res.send(hdb);
// });
//to find the construction blocks under the specific project manager
// app.get("/user/:id/construction", async (req, res) => {
//   const { id } = req.params;
//   const hdb = await Block.find({ projectmanager: id, status: "Construction" });
//   res.send(hdb);
// });
//to find the tnc blocks under the specific project manager
// app.get("/user/:id/tnc", async (req, res) => {
//   const { id } = req.params;
//   const hdb = await Block.find({ projectmanager: id, status: "Testing and Commissioning" });
//   res.send(hdb);
// });
//to find the turned on blocks under the specific project manager
// app.get("/user/:id/turned on", async (req, res) => {
//   const { id } = req.params;
//   const hdb = await Block.find({ projectmanager: id, status: "Turned On" });
//   res.send(hdb);
// });
//get the specific block details, id is postal code
app.get("/:id", async (req, res) => {
  const { id } = req.params;
  const hdb = await Block.find({ postalcode: id });
  res.send(hdb);
});

///////////////////////////////////////////////////////////////////////////////////////////////
//to get pending blocks to be updated to construction
app.get("/:id/construction", async (req, res) => {
  const { id } = req.params;
  const hdb = await Block.find({ postalcode: id });
  res.send(hdb);
});

app.put("/:id", async (req, res) => {
  const { id } = req.params;
  const hdb = await Block.updateOne({ postalcode: id }, req.body, {
    new: true,
  });
  res.send(hdb);
});

//to get construction blocks to be updated to tnc
app.get("/:id/tnc", async (req, res) => {
  const { id } = req.params;
  const hdb = await Block.find({ postalcode: id });
  res.send(hdb);
});

app.put("/:id", async (req, res) => {
  const { id } = req.params;
  const hdb = await Block.updateOne({ postalcode: id }, req.body, {
    new: true,
  });
  res.send(hdb);
});

//to get tnc blocks to be updated to turnon
app.get("/:id/turnon", async (req, res) => {
  const { id } = req.params;
  const hdb = await Block.find({ postalcode: id });
  res.send(hdb);
});

app.put("/:id", async (req, res) => {
  const { id } = req.params;
  const hdb = await Block.updateOne({ postalcode: id }, req.body, {
    new: true,
  });
  res.send(hdb);
});
///////////////////////////////////////////////////////////////////////////////////////////////
// app.get("/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     console.log(id);
//     if ((id === undefined) | null) {
//       throw new Error("item name undefined");
//     }
//     const hdb = await Block.find({ postalcode: id });
//     console.log("item: ", hdb);
//     res.send(hdb);
//   } catch (err) {
//     res.status(404).send(err.message);
//     console.log(err);
//   }
// });

//to add new pending blocks
app.post("/", async (req, res) => {
  try {
    console.log("new hdb: ", req.body);
    const hdb = await Block.create(req.body);
    res.send(hdb);
  } catch (error) {
    console.log(error);
  }
});

app.delete("/:id", async (req, res) => {
  const hdb = await Block.findOneAndDelete({ _id: req.params.id });
  res.send(hdb);
});

module.exports = app;
