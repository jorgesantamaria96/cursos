import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const { Schema } = mongoose;

const CarritoSchema = new Schema(
  {
    timestamp: {
      type: Number,
      required: true,
    },
    products: [
      {
        ref: "Product",
        type: Schema.Types.ObjectId,
      },
    ],
  },
  {
    versionKey: false,
  }
);

export default CarritoSchema;
