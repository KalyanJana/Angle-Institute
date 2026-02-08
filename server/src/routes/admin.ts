import { Router, Response } from "express";
import { AuthRequest, verifyToken } from "../middlewares/auth";
import Submission from "../models/Submission";
import Course from "../models/Course";
import SessionStore from "../services/SessionStore";

const router = Router();

// Apply auth middleware to all admin routes
router.use(verifyToken);

/**
 * GET /api/admin/submissions
 * Get all submissions (optionally filtered by type)
 */
router.get("/submissions", async (req: AuthRequest, res: Response) => {
  try {
    const { type } = req.query;

    let query: any = {};
    if (type) {
      query.type = type;
    }

    const submissions = await Submission.find(query)
      .select(
        "submissionId type name email phone message subject address location emailSent retryCount createdAt sentAt",
      )
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      total: submissions.length,
      submissions,
    });
  } catch (err) {
    console.error("[Admin] Get submissions error:", err);
    res.status(500).json({ error: "Server error. Please try again." });
  }
});

/**
 * DELETE /api/admin/submissions/:submissionId
 * Delete a submission by ID
 */
router.delete(
  "/submissions/:submissionId",
  async (req: AuthRequest, res: Response) => {
    try {
      const { submissionId } = req.params;

      // Find and delete the submission
      const result = await Submission.findOneAndDelete({
        submissionId,
      });

      if (!result) {
        return res.status(404).json({ error: "Submission not found" });
      }

      // Clean up from session store if it exists
      const sessionRecord = SessionStore.get(submissionId);
      if (sessionRecord) {
        SessionStore.cleanup(submissionId);
      }

      res.json({
        success: true,
        message: "Submission deleted successfully",
      });
    } catch (err) {
      console.error("[Admin] Delete submission error:", err);
      res.status(500).json({ error: "Server error. Please try again." });
    }
  },
);

/**
 * GET /api/admin/submissions/failed
 * Get all failed submissions
 */
router.get("/submissions/failed", async (req: AuthRequest, res: Response) => {
  try {
    const submissions = await Submission.find({ emailSent: false })
      .select(
        "submissionId type name email phone message subject address location emailError retryCount createdAt",
      )
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      total: submissions.length,
      submissions,
    });
  } catch (err) {
    console.error("[Admin] Get failed submissions error:", err);
    res.status(500).json({ error: "Server error. Please try again." });
  }
});

/**
 * GET /api/admin/courses
 * Get all courses
 */
router.get("/courses", async (req: AuthRequest, res: Response) => {
  try {
    const courses = await Course.find()
      .select("_id slug title description image duration level price createdAt")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      total: courses.length,
      courses,
    });
  } catch (err) {
    console.error("[Admin] Get courses error:", err);
    res.status(500).json({ error: "Server error. Please try again." });
  }
});

/**
 * POST /api/admin/courses
 * Create a new course
 */
router.post("/courses", async (req: AuthRequest, res: Response) => {
  console.log(
    `[Admin Route] ${req.method} ${req.path} - received at ${new Date().toISOString()}`,
  );
  try {
    const { title, description, image, duration, level, price } = req.body;

    // Validate required fields
    if (!title || !description || !image || !duration || !level) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Create slug from title
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    // Check if slug already exists
    const existing = await Course.findOne({ slug });
    if (existing) {
      return res
        .status(400)
        .json({ error: "Course with this title already exists" });
    }

    // Create new course
    const course = new Course({
      slug,
      title,
      description,
      image,
      duration,
      level,
      price: price || 0,
    });

    await course.save();

    res.json({
      success: true,
      message: "Course created successfully",
      course,
    });
  } catch (err) {
    console.error("[Admin] Create course error:", err);
    res.status(500).json({ error: "Server error. Please try again." });
  }
});

/**
 * DELETE /api/admin/courses/:courseId
 * Delete a course by ID
 */
router.delete("/courses/:courseId", async (req: AuthRequest, res: Response) => {
  try {
    const { courseId } = req.params;

    const result = await Course.findByIdAndDelete(courseId);

    if (!result) {
      return res.status(404).json({ error: "Course not found" });
    }

    res.json({
      success: true,
      message: "Course deleted successfully",
    });
  } catch (err) {
    console.error("[Admin] Delete course error:", err);
    res.status(500).json({ error: "Server error. Please try again." });
  }
});

export default router;
