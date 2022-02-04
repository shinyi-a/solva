const mongoose = require("mongoose");
const Schema = mongoose.Schema;
schema.set("validateBeforeSave", false);
const SALT_WORK_FACTOR = 10;

const userSchema = new Schema({
  username: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    unique: true,
  },
  usertype: {
    type: String,
    required: true,
  },
  userID: Schema.Types.ObjectId,
});

userSchema.pre("save", function (next) {
  let user = this;
  bcrypt.hash(user.password, SALT_WORK_FACTOR, (err, hash) => {
    if (err) return next(err);
    user.password = hash;
    next();
  });
});

module.exports = mongoose.model("User", userSchema);
