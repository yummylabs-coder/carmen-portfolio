import { NextResponse } from "next/server";
import { Resend } from "resend";

function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error("RESEND_API_KEY is not set");
  return new Resend(key);
}

const WORK_LABELS: Record<string, string> = {
  fulltime: "Full-time role",
  consulting: "Consulting",
  yummylabs: "Yummy Labs Sprint",
  speaking: "Speaking",
};

export async function POST(req: Request) {
  try {
    const { email, message, workType } = await req.json();

    if (!email || !message) {
      return NextResponse.json(
        { error: "Email and message are required" },
        { status: 400 },
      );
    }

    const workLabel = workType ? WORK_LABELS[workType] ?? workType : "Not specified";

    const resend = getResend();

    await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: "hello@yummydesign.xyz",
      replyTo: email,
      subject: `New portfolio message${workType ? ` | ${workLabel}` : ""}`,
      html: `
        <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto;">
          <h2 style="color: #300101; margin-bottom: 4px;">New message from your portfolio</h2>
          <hr style="border: none; border-top: 1px solid #E0E0DC; margin: 16px 0;" />
          <p style="margin: 0 0 4px;"><strong>From:</strong> ${email}</p>
          <p style="margin: 0 0 4px;"><strong>Interest:</strong> ${workLabel}</p>
          <hr style="border: none; border-top: 1px solid #E0E0DC; margin: 16px 0;" />
          <p style="white-space: pre-wrap; color: #300101;">${message}</p>
          <hr style="border: none; border-top: 1px solid #E0E0DC; margin: 16px 0;" />
          <p style="color: #878784; font-size: 13px;">Sent from carmen-portfolio contact form</p>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 },
    );
  }
}
