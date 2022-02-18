const express = require("express");
const app = express();
const Block = require("./../../models/blockModel");
// const methodOverride = require("method-override");

// app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));

app.get("/all", async (req, res) => {
  const hdb = await Block.find();
  res.send(hdb);
});

app.get("/pending", async (req, res) => {
  const hdb = await Block.find({ status: "Pending" });
  res.send(hdb);
});

app.get("/construction", async (req, res) => {
  const hdb = await Block.find({ status: "Construction" });
  res.send(hdb);
});

app.get("/tnc", async (req, res) => {
  const hdb = await Block.find({ status: "Testing and Commissioning" });
  res.send(hdb);
});

app.get("/turnon", async (req, res) => {
  const hdb = await Block.find({ status: "Turned On" });
  res.send(hdb);
});

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
    status: "turnon",
    turnondate: { $gte: startdate, $lte: enddate },
  });
  res.send(hdb);
});

app.get("/user/:id", async (req, res) => {
  const { id } = req.params;
  const hdb = await Block.find({ projectmanager: id });
  res.send(hdb);
});

app.get("/:id", async (req, res) => {
  const { id } = req.params;
  const hdb = await Block.find({ postalcode: id });
  res.send(hdb);
});

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

app.post("/", async (req, res) => {
  try {
    console.log("new hdb: ", req.body);
    const hdb = await Block.create(req.body);
    res.send(hdb);
  } catch (error) {
    console.log(error);
  }
});

// app.get("/:id", async (req, res) => {
//   const { id } = req.params;
//   const hdb = await Block.find({ postalcode: id });
//   res.send(hdb);
// });

// app.get("/all/:id", async (req, res) => {
//   const { id } = req.params;
//   const hdb = await Block.find({ username: id });
//   res.send(hdb);
// });

// app.get("/pending/:id", async (req, res) => {
//   const { id } = req.params;
//   const hdb = await Block.find({ status: "pending", username: id });
//   res.send(hdb);
// });

// app.get("/construction/:id", async (req, res) => {
//   const { id } = req.params;
//   const hdb = await Block.find({ status: "construction", username: id });
//   res.send(hdb);
// });

// app.get("/tnc/:id", async (req, res) => {
//   const { id } = req.params;
//   const hdb = await Block.find({ status: "tnc", username: id });
//   res.send(hdb);
// });

// app.get("/turnon/:id", async (req, res) => {
//   const { id } = req.params;
//   const hdb = await Block.find({ status: "turnon", username: id });
//   res.send(hdb);
// });

// ////////////////////////////////////////////////////
// app.get("/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     console.log(id);
//     if ((id === undefined) | null) {
//       throw new Error("postal code undefined");
//     }
//     const hdb = await Block.findById(id);
//     console.log("hdb: ", hdb);
//     res.send(hdb);
//   } catch (err) {
//     res.status(404).send(err.message);
//     console.log(err);
//   }
// });

// app.post("/", async (req, res) => {
//   console.log("new hdb: ", req.body);
//   const hdb = await Block.create(req.body);
//   res.send(hdb);
// });

app.delete("/:id", async (req, res) => {
  const hdb = await Block.findOneAndDelete({ _id: req.params.id });
  res.send(hdb);
});

app.put("/:id", async (req, res) => {
  const hdb = await Block.updateOne({ _id: req.params.id }, req.body, {
    new: true,
  });
  res.send(hdb);
});

// app.get("/seed", async (req, res) => {
//   console.log("seeding with data: ", itemsSeed);
//   try {
//     const seedItems = await Block.create(itemsSeed);
//     res.send(seedItems);
//   } catch (err) {
//     res.send(err.message);
//   }
// });

// app.delete('/all', async (req, res) => {
//   const tx = await Item.deleteMany({})
//   res.send(tx)
// })

module.exports = app;
