import { Router } from "express";
import { EnquiryController } from "../controllers/EnquiryController";

const router = Router();

// POST /api/enquiries - Create new enquiry
router.post("/", EnquiryController.create);

// GET /api/enquiries - Get all enquiries
router.get("/", EnquiryController.getAll);

// GET /api/enquiries/:id - Get enquiry by ID
router.get("/:id", EnquiryController.getById);

// PATCH /api/enquiries/:id - Update enquiry status
router.patch("/:id", EnquiryController.updateStatus);

// DELETE /api/enquiries/:id - Delete enquiry
router.delete("/:id", EnquiryController.delete);

export default router;
