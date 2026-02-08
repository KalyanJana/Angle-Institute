import { Router, Response, Request } from "express";
import Course from "../models/Course";

const router = Router();

/**
 * GET /api/courses
 * Get all courses (public endpoint, no auth required)
 */
router.get("/", async (req: Request, res: Response) => {
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
    console.error("[Courses] Get courses error:", err);
    res.status(500).json({ error: "Server error. Please try again." });
  }
});

/**
 * GET /api/courses/:slug
 * Get a single course by slug
 */
router.get("/:slug", async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;

    const course = await Course.findOne({ slug });

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    res.json({
      success: true,
      course,
    });
  } catch (err) {
    console.error("[Courses] Get course by slug error:", err);
    res.status(500).json({ error: "Server error. Please try again." });
  }
});

export default router;
