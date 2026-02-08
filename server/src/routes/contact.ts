import { Router, Request, Response } from "express";
import { EnquiryService } from "../services/EnquiryService";

const router = Router();

// POST /api/contact - Legacy contact endpoint (redirects to enquiry)
router.post("/", (req: Request, res: Response) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res
      .status(400)
      .json({ error: "Name, email, and message are required" });
  }

  try {
    const enquiry = EnquiryService.create({
      name,
      email,
      phone: "",
      subject: "General Enquiry",
      message,
    });
    return res.json({ ok: true, message: "Contact received", enquiry });
  } catch (err) {
    console.error("Error processing contact:", err);
    return res.status(500).json({ error: "Failed to process contact" });
  }
});

export default router;
