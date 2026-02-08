import { Schema, model, Document } from "mongoose";

export interface ISubmission extends Document {
  submissionId: string;
  type: "contact" | "franchise" | "enquiry";
  name: string;
  email: string;
  phone: string;
  message?: string;
  subject?: string;
  address?: string;
  location?: string;
  emailSent: boolean;
  emailError?: string;
  retryCount: number;
  createdAt: Date;
  sentAt?: Date;
}

const submissionSchema = new Schema<ISubmission>(
  {
    submissionId: { type: String, required: true, unique: true, index: true },
    type: {
      type: String,
      enum: ["contact", "franchise", "enquiry"],
      required: true,
    },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    message: { type: String },
    subject: { type: String },
    address: { type: String },
    location: { type: String },
    emailSent: { type: Boolean, default: false },
    emailError: { type: String },
    retryCount: { type: Number, default: 0 },
    sentAt: { type: Date },
  },
  { timestamps: true },
);

// Index for querying by type and emailSent status
submissionSchema.index({ type: 1, emailSent: 1 });

export default model<ISubmission>("Submission", submissionSchema);
