import Submission, { ISubmission } from "../models/Submission";

/**
 * Session store with MongoDB persistence.
 * Stores form submissions both in-memory (for quick status checks)
 * and in MongoDB (for permanent record and admin dashboard).
 */

interface SubmissionRecord {
  id: string;
  type: "contact" | "franchise" | "enquiry";
  data: Record<string, any>;
  createdAt: number;
  emailSent: boolean;
  retryCount: number;
}

class SessionStore {
  private sessions: Map<string, SubmissionRecord> = new Map();
  private readonly SESSION_TTL = 24 * 60 * 60 * 1000; // 24 hours

  /**
   * Store a form submission in session AND database
   */
  async store(
    id: string,
    type: "contact" | "franchise" | "enquiry",
    data: Record<string, any>,
  ): Promise<SubmissionRecord> {
    const record: SubmissionRecord = {
      id,
      type,
      data,
      createdAt: Date.now(),
      emailSent: false,
      retryCount: 0,
    };

    // Store in memory for quick access
    this.sessions.set(id, record);

    // Persist to database
    try {
      await Submission.create({
        submissionId: id,
        type,
        name: data.name,
        email: data.email,
        phone: data.phone,
        message: data.message,
        subject: data.subject,
        address: data.address,
        location: data.location,
        emailSent: false,
        retryCount: 0,
      });
    } catch (err) {
      console.error("[SessionStore] Failed to save to database:", err);
      // Still return the in-memory record even if DB fails
    }

    return record;
  }

  /**
   * Get a session by ID
   */
  get(id: string): SubmissionRecord | undefined {
    const record = this.sessions.get(id);
    if (!record) return undefined;

    // Check TTL and clean up if expired
    if (Date.now() - record.createdAt > this.SESSION_TTL) {
      this.sessions.delete(id);
      return undefined;
    }

    return record;
  }

  /**
   * Mark email as sent and update database
   */
  async markAsSent(id: string): Promise<boolean> {
    const record = this.sessions.get(id);
    if (record) {
      record.emailSent = true;

      // Update database
      try {
        await Submission.findOneAndUpdate(
          { submissionId: id },
          { emailSent: true, sentAt: new Date() },
          { new: true },
        );
      } catch (err) {
        console.error("[SessionStore] Failed to update sent status:", err);
      }

      // Keep in memory for a few seconds before cleanup
      setTimeout(() => this.sessions.delete(id), 5000);
      return true;
    }
    return false;
  }

  /**
   * Increment retry count
   */
  async incrementRetry(id: string): Promise<number | null> {
    const record = this.sessions.get(id);
    if (record) {
      record.retryCount++;

      // Update database
      try {
        await Submission.findOneAndUpdate(
          { submissionId: id },
          { retryCount: record.retryCount },
          { new: true },
        );
      } catch (err) {
        console.error("[SessionStore] Failed to update retry count:", err);
      }

      return record.retryCount;
    }
    return null;
  }

  /**
   * Mark as failed and update database
   */
  async markAsFailed(id: string, error?: string): Promise<void> {
    this.sessions.delete(id);

    // Update database
    try {
      await Submission.findOneAndUpdate(
        { submissionId: id },
        { emailError: error || "Failed after max retries" },
        { new: true },
      );
    } catch (err) {
      console.error("[SessionStore] Failed to mark as failed:", err);
    }
  }

  /**
   * Cleanup expired sessions
   */
  cleanup(id?: string): void {
    if (id) {
      this.sessions.delete(id);
      return;
    }

    const now = Date.now();
    for (const [id, record] of this.sessions.entries()) {
      if (now - record.createdAt > this.SESSION_TTL) {
        this.sessions.delete(id);
      }
    }
  }

  /**
   * Get all submissions (for admin dashboard)
   */
  async getAllSubmissions(type?: string) {
    try {
      const query = type ? { type } : {};
      return await Submission.find(query).sort({ createdAt: -1 });
    } catch (err) {
      console.error("[SessionStore] Failed to fetch submissions:", err);
      return [];
    }
  }

  /**
   * Get failed submissions (pending retry)
   */
  async getFailedSubmissions() {
    try {
      return await Submission.find({
        emailSent: false,
        emailError: { $exists: true },
      }).sort({ createdAt: -1 });
    } catch (err) {
      console.error("[SessionStore] Failed to fetch failed submissions:", err);
      return [];
    }
  }
}

// Export singleton instance
export default new SessionStore();
