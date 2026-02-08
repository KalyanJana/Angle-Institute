import fs from "fs";
import path from "path";
import { Enquiry, EnquiryModel } from "../models/Enquiry";

const DATA_DIR = path.join(__dirname, "../../data");
const ENQUIRIES_FILE = path.join(DATA_DIR, "enquiries.json");

export class EnquiryService {
  private static ensureDataDir() {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
  }

  private static loadEnquiries(): Enquiry[] {
    this.ensureDataDir();
    if (!fs.existsSync(ENQUIRIES_FILE)) {
      return [];
    }
    try {
      const data = fs.readFileSync(ENQUIRIES_FILE, "utf-8");
      return JSON.parse(data);
    } catch (e) {
      console.error("Error loading enquiries:", e);
      return [];
    }
  }

  private static saveEnquiries(enquiries: Enquiry[]) {
    this.ensureDataDir();
    fs.writeFileSync(ENQUIRIES_FILE, JSON.stringify(enquiries, null, 2));
  }

  static create(data: Omit<Enquiry, "id" | "createdAt" | "status">): Enquiry {
    const enquiry = EnquiryModel.create(data);
    const enquiries = this.loadEnquiries();
    enquiries.push(enquiry);
    this.saveEnquiries(enquiries);
    return enquiry;
  }

  static getAll(): Enquiry[] {
    return this.loadEnquiries();
  }

  static getById(id: string): Enquiry | null {
    const enquiries = this.loadEnquiries();
    return enquiries.find((e) => e.id === id) || null;
  }

  static updateStatus(
    id: string,
    status: "new" | "read" | "replied",
  ): Enquiry | null {
    const enquiries = this.loadEnquiries();
    const index = enquiries.findIndex((e) => e.id === id);
    if (index === -1) return null;
    enquiries[index].status = status;
    this.saveEnquiries(enquiries);
    return enquiries[index];
  }

  static delete(id: string): boolean {
    const enquiries = this.loadEnquiries();
    const filtered = enquiries.filter((e) => e.id !== id);
    if (filtered.length === enquiries.length) return false;
    this.saveEnquiries(filtered);
    return true;
  }
}
