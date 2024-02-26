import mongoose, { Schema } from "mongoose";

const CodeSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    code: {
      type: String,
      required: true,
      trim: true,
    },
  },
);

const Code = mongoose.models.Code || mongoose.model("Code", CodeSchema);

export default Code;
