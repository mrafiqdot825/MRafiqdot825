import { NextResponse } from "next/server";
import { Resend } from "resend";
import { site } from "@/data/site";

const RESEND_API_KEY = process.env.RESEND_API_KEY;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validate parameters
    if (!name || typeof name !== "string") {
      return NextResponse.json(
        { error: "Name is required and must be a string." },
        { status: 400 }
      );
    }
    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { error: "A valid email is required." },
        { status: 400 }
      );
    }
    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Message is required and must be a string." },
        { status: 400 }
      );
    }

    if (!RESEND_API_KEY) {
      console.error("Resend API key is not configured");
      return NextResponse.json(
        { error: "Email service is not configured on the server." },
        { status: 500 }
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    // Use configured sender domain or fallback to onboarding@resend.dev
    const fromEmail = process.env.CONTACT_SENDER_EMAIL || process.env.NEXT_PUBLIC_CONTACT_SENDER_EMAIL || "Portfolio Contact <onboarding@resend.dev>";
    // Use configured receiver or fallback to the site's email address
    const toEmail = process.env.CONTACT_RECEIVER_EMAIL || process.env.NEXT_PUBLIC_CONTACT_RECEIVER_EMAIL || site.email;

    // Send the email and handle data and error returned by the SDK directly (no try/catch for SDK response error status)
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      subject: `Portfolio Inquiry: ${subject || "No Subject"}`,
      replyTo: email,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #2C2C2A; max-width: 600px; margin: 0 auto; border: 1px solid #E3D5CA; border-radius: 8px; background-color: #EDEEE9;">
          <h2 style="color: #8A6F62; border-bottom: 2px solid #D7BDB0; padding-bottom: 8px; margin-bottom: 16px;">New Contact Form Submission</h2>
          <p style="margin: 8px 0;"><strong>From:</strong> ${name} (&lt;${email}&gt;)</p>
          <p style="margin: 8px 0;"><strong>Subject:</strong> ${subject || "No Subject"}</p>
          <div style="margin-top: 20px; padding: 16px; background-color: #F5EBE1; border-left: 4px solid #D7BDB0; border-radius: 4px;">
            <p style="margin: 0 0 8px 0; font-weight: 600; color: #4A1B0C;">Message:</p>
            <p style="margin: 0; white-space: pre-wrap; line-height: 1.5; color: #2C2C2A;">${message}</p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error("Resend send error:", error);
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true, id: data?.id });
  } catch (error) {
    console.error("Contact API route exception:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to send email due to an internal server error",
      },
      { status: 500 }
    );
  }
}
