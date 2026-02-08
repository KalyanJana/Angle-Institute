import { Router, Request, Response } from "express";
import { randomUUID } from "crypto";
import SessionStore from "../services/SessionStore";
import EmailService from "../services/EmailService";

const router = Router();

/**
 * POST /api/submissions/contact
 * Handle contact form submissions
 */
router.post("/contact", async (req: Request, res: Response) => {
  try {
    const { name, email, phone, message } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !message) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const submissionId = randomUUID();

    // Store in session and database
    await SessionStore.store(submissionId, "contact", {
      name,
      email,
      phone,
      message,
    });

    // Send immediate response to user
    res.json({
      success: true,
      message:
        "Thank you! Our team will review your request and get back to you shortly.",
      submissionId,
    });

    // Async background task: send email
    (async () => {
      const emailContent = EmailService.formatContactEmail({
        name,
        email,
        phone,
        message,
      });
      const adminEmail = process.env.ADMIN_EMAIL || "admin@lalaniacademy.in";

      const sent = await EmailService.sendWithRetry({
        to: adminEmail,
        ...emailContent,
      });

      if (sent) {
        await SessionStore.markAsSent(submissionId);
      } else {
        await SessionStore.markAsFailed(
          submissionId,
          "Email send failed after retries",
        );
        console.error(
          `[API] Contact email failed for submission ${submissionId}`,
        );
      }
    })();
  } catch (err) {
    console.error("[API] Contact submission error:", err);
    res.status(500).json({ error: "Server error. Please try again." });
  }
});

/**
 * POST /api/submissions/franchise
 * Handle franchise inquiry submissions
 */
router.post("/franchise", async (req: Request, res: Response) => {
  try {
    const { name, email, phone, address, location } = req.body;

    // Validate required fields
    if (!name || !email || !phone) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const submissionId = randomUUID();

    // Store in session and database
    await SessionStore.store(submissionId, "franchise", {
      name,
      email,
      phone,
      address: address || "",
      location: location || "",
    });

    // Send immediate response to user
    res.json({
      success: true,
      message:
        "Thank you for your interest! Our franchise team will contact you shortly.",
      submissionId,
    });

    // Async background task: send email
    (async () => {
      const emailContent = EmailService.formatFranchiseEmail({
        name,
        email,
        phone,
        address,
        location,
      });
      const franchiseEmail =
        process.env.FRANCHISE_EMAIL || "franchise@lalaniacademy.in";

      const sent = await EmailService.sendWithRetry({
        to: franchiseEmail,
        ...emailContent,
      });

      if (sent) {
        await SessionStore.markAsSent(submissionId);
      } else {
        await SessionStore.markAsFailed(
          submissionId,
          "Email send failed after retries",
        );
        console.error(
          `[API] Franchise email failed for submission ${submissionId}`,
        );
      }
    })();
  } catch (err) {
    console.error("[API] Franchise submission error:", err);
    res.status(500).json({ error: "Server error. Please try again." });
  }
});

/**
 * GET /api/submissions/:submissionId/status
 * Check submission status
 */
router.get("/:submissionId/status", (req: Request, res: Response) => {
  try {
    const { submissionId } = req.params;
    const record = SessionStore.get(submissionId);

    if (!record) {
      return res.status(404).json({ error: "Submission not found or expired" });
    }

    res.json({
      id: record.id,
      type: record.type,
      emailSent: record.emailSent,
      status: record.emailSent ? "sent" : "pending",
    });
  } catch (err) {
    console.error("[API] Status check error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

/**
 * GET /api/submissions/admin/all
 * Get all submissions (admin only - add auth middleware in production)
 */
router.get("/admin/all", async (req: Request, res: Response) => {
  try {
    const type = req.query.type as string | undefined;
    const submissions = await SessionStore.getAllSubmissions(type);
    res.json({ submissions });
  } catch (err) {
    console.error("[API] Admin fetch error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

/**
 * GET /api/submissions/admin/failed
 * Get failed submissions (admin only)
 */
router.get("/admin/failed", async (req: Request, res: Response) => {
  try {
    const failed = await SessionStore.getFailedSubmissions();
    res.json({ submissions: failed });
  } catch (err) {
    console.error("[API] Admin fetch failed submissions error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
