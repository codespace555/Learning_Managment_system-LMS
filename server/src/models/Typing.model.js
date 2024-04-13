import mongoose, { Schema } from "mongoose";

const TypeSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    test_date: {
      type: Date,
      default: Date.now,
    },
    test_duration: Number,
    accuracy: Number,
    speed: Number,
  },
  {
    timestamps: true,
  }
);

const Test = mongoose.model("Test",TypeSchema)

export {Test}
