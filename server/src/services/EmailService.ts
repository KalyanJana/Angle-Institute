import nodemailer from "nodemailer";

/**
 * Email service with retry mechanism and async sending.
 * Supports multiple retries before marking as failed.
 */

interface EmailPayload {
  to: string;
  subject: string;
  text: string;
  html: string;
}

class EmailService {
  private transporter: nodemailer.Transporter | null = null;
  private readonly MAX_RETRIES = 2;

  constructor() {
    this.initTransporter();
  }

  /**
   * Initialize email transporter with configured settings
   */
  private initTransporter() {
    const emailUser = process.env.SMTP_USER?.trim();
    const emailPass = (process.env.SMTP_PASS || "").trim();
    const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
    const smtpPort = parseInt(process.env.SMTP_PORT || "587");

    try {
      this.transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465, // true for 465, false for other ports
        auth: {
          user: emailUser,
          pass: emailPass,
        },
      });
    } catch (err) {
      console.error("[EmailService] Failed to initialize transporter:", err);
    }
  }

  /**
   * Send email with retry mechanism
   * Returns true if sent successfully, false if failed
   */
  async sendWithRetry(
    payload: EmailPayload,
    currentRetry: number = 0,
  ): Promise<boolean> {
    if (!this.transporter) {
      console.error("[EmailService] Transporter not initialized");
      return false;
    }

    try {
      await this.transporter.sendMail({
        from: process.env.SMTP_USER,
        ...payload,
      });

      console.log(`[EmailService] Email sent successfully to ${payload.to}`);
      return true;
    } catch (err) {
      console.error(
        `[EmailService] Send attempt ${currentRetry + 1} failed:`,
        err,
      );

      // Retry logic
      if (currentRetry < this.MAX_RETRIES) {
        // Exponential backoff: 2s, 4s, 8s
        const delayMs = Math.pow(2, currentRetry + 1) * 1000;
        console.log(
          `[EmailService] Retrying in ${delayMs}ms (attempt ${currentRetry + 2}/${this.MAX_RETRIES + 1})`,
        );

        await new Promise((resolve) => setTimeout(resolve, delayMs));
        return this.sendWithRetry(payload, currentRetry + 1);
      }

      console.error(
        `[EmailService] Email sending failed after ${this.MAX_RETRIES + 1} attempts`,
      );
      return false;
    }
  }

  /**
   * Format contact form data as email HTML
   */
  formatContactEmail(data: any): {
    subject: string;
    text: string;
    html: string;
  } {
    const subject = "New Contact Form Submission - Angle Institute";
    const text = `
Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}
Message: ${data.message}
    `.trim();

    const html = `
<div style="font-family: Arial, sans-serif; max-width: 600px;">
  <h2>New Contact Form Submission</h2>
  <p><strong>Name:</strong> ${this.escapeHtml(data.name)}</p>
  <p><strong>Email:</strong> ${this.escapeHtml(data.email)}</p>
  <p><strong>Phone:</strong> ${this.escapeHtml(data.phone)}</p>
  <p><strong>Message:</strong></p>
  <p>${this.escapeHtml(data.message).replace(/\n/g, "<br>")}</p>
  <hr>
  <p style="color: #666; font-size: 12px;">This email was sent from the Angle Institute website contact form.</p>
</div>
    `.trim();

    return { subject, text, html };
  }

  /**
   * Format franchise inquiry as email HTML
   */
  formatFranchiseEmail(data: any): {
    subject: string;
    text: string;
    html: string;
  } {
    const subject = "New Franchise Inquiry - Angle Institute";
    const text = `
Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}
Address: ${data.address}
Location: ${data.location}
    `.trim();

    const html = `
<div style="font-family: Arial, sans-serif; max-width: 600px;">
  <h2>New Franchise Inquiry</h2>
  <p><strong>Name:</strong> ${this.escapeHtml(data.name)}</p>
  <p><strong>Email:</strong> ${this.escapeHtml(data.email)}</p>
  <p><strong>Phone:</strong> ${this.escapeHtml(data.phone)}</p>
  <p><strong>Address:</strong> ${this.escapeHtml(data.address)}</p>
  <p><strong>Location:</strong> ${this.escapeHtml(data.location)}</p>
  <hr>
  <p style="color: #666; font-size: 12px;">This email was sent from the Angle Institute franchise page.</p>
</div>
    `.trim();

    return { subject, text, html };
  }

  /**
   * Simple HTML escape
   */
  private escapeHtml(text: string): string {
    const map: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    };
    return text.replace(/[&<>"']/g, (m) => map[m]);
  }
}

export default new EmailService();
