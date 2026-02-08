export interface Enquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  createdAt: string;
  status?: "new" | "read" | "replied";
}

export class EnquiryModel {
  static create(data: Omit<Enquiry, "id" | "createdAt" | "status">): Enquiry {
    return {
      id: Date.now().toString(),
      ...data,
      createdAt: new Date().toISOString(),
      status: "new",
    };
  }

  static validate(data: any): string[] {
    const errors: string[] = [];
    if (!data.name || typeof data.name !== "string")
      errors.push("Name is required");
    if (!data.email || typeof data.email !== "string")
      errors.push("Valid email is required");
    if (!data.phone || typeof data.phone !== "string")
      errors.push("Phone is required");
    if (!data.subject || typeof data.subject !== "string")
      errors.push("Subject is required");
    if (!data.message || typeof data.message !== "string")
      errors.push("Message is required");
    return errors;
  }
}
