import { Schema, model, Document } from "mongoose";

export interface ICourse extends Document {
  slug: string;
  title: string;
  description: string;
  image: string;
  duration: string;
  level: string;
  price?: number;
  createdAt: Date;
  updatedAt: Date;
}

const courseSchema = new Schema<ICourse>(
  {
    slug: { type: String, required: true, unique: true, lowercase: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    duration: { type: String, required: true },
    level: { type: String, required: true, enum: ["Beginner", "Intermediate", "Advanced"] },
    price: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default model<ICourse>("Course", courseSchema);
