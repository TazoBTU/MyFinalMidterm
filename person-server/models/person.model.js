const { model, Schema } = require("mongoose");

const PersonSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  age: { type: Number, required: true },
  height: { type: Number, required: true }
});

module.exports = model("persons", PersonSchema);
