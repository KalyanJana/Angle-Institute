import { Request, Response } from "express";
import { EnquiryModel } from "../models/Enquiry";
import { EnquiryService } from "../services/EnquiryService";

export class EnquiryController {
  static create(req: Request, res: Response) {
    const errors = EnquiryModel.validate(req.body);
    if (errors.length > 0) {
      return res.status(400).json({ error: "Validation failed", errors });
    }

    try {
      const enquiry = EnquiryService.create(req.body);
      console.log("Enquiry created:", enquiry.id);
      return res
        .status(201)
        .json({ ok: true, message: "Enquiry submitted successfully", enquiry });
    } catch (err: any) {
      console.error("Error creating enquiry:", err);
      return res.status(500).json({ error: "Failed to create enquiry" });
    }
  }

  static getAll(_req: Request, res: Response) {
    try {
      const enquiries = EnquiryService.getAll();
      return res.json({ enquiries, count: enquiries.length });
    } catch (err) {
      console.error("Error fetching enquiries:", err);
      return res.status(500).json({ error: "Failed to fetch enquiries" });
    }
  }

  static getById(req: Request, res: Response) {
    const id = String(req.params.id);
    try {
      const enquiry = EnquiryService.getById(id);
      if (!enquiry) {
        return res.status(404).json({ error: "Enquiry not found" });
      }
      return res.json(enquiry);
    } catch (err) {
      console.error("Error fetching enquiry:", err);
      return res.status(500).json({ error: "Failed to fetch enquiry" });
    }
  }

  static updateStatus(req: Request, res: Response) {
    const id = String(req.params.id);
    const { status } = req.body;

    if (!["new", "read", "replied"].includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    try {
      const enquiry = EnquiryService.updateStatus(id, status);
      if (!enquiry) {
        return res.status(404).json({ error: "Enquiry not found" });
      }
      return res.json({ ok: true, enquiry });
    } catch (err) {
      console.error("Error updating enquiry:", err);
      return res.status(500).json({ error: "Failed to update enquiry" });
    }
  }

  static delete(req: Request, res: Response) {
    const id = String(req.params.id);
    try {
      const deleted = EnquiryService.delete(id);
      if (!deleted) {
        return res.status(404).json({ error: "Enquiry not found" });
      }
      return res.json({ ok: true, message: "Enquiry deleted" });
    } catch (err) {
      console.error("Error deleting enquiry:", err);
      return res.status(500).json({ error: "Failed to delete enquiry" });
    }
  }
}
