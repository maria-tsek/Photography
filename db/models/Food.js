import mongoose from "mongoose";

const { Schema } = mongoose;

const foodSchema = new Schema(
  {
    _id: { type: String, required: true },
    name: { type: String, required: true },
    image: { type: String, required: true },
  },
  { collection: "food" }
);

const Food = mongoose.models.Food || mongoose.model("Food", foodSchema);

export default Food;
