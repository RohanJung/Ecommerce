import mongoose from "mongoose";
const categorySchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    maxLength: 32,
    unique: true,
  },
});

const category = mongoose.model("Category", categorySchema);
export default category;
