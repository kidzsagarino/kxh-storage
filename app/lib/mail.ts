import nodemailer from "nodemailer";

type SendEmailArgs = {
  to: string | string[];
  subject: string;
  html?: string;
  text?: string;
  attachments?: Array<{
    filename: string;
    content: Buffer;
    contentType?: string;
  }>;
  replyTo?: string;
};

let cachedTransporter: nodemailer.Transporter | null = null;

function getTransporter() {
  if (cachedTransporter) return cachedTransporter;

  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || "587");
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  // For SendGrid SMTP, user is literally "apikey"
  if (!host || !user || !pass) {
    throw new Error("SMTP env vars missing (SMTP_HOST/SMTP_PORT/SMTP_USER/SMTP_PASS)");
  }

  cachedTransporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  return cachedTransporter;
}

export async function sendEmail({
  to,
  subject,
  html,
  text,
  attachments,
  replyTo,
}: SendEmailArgs) {
  const from = process.env.SMTP_FROM || process.env.SMTP_USER;
  if (!from) throw new Error("SMTP_FROM missing");

  const transporter = getTransporter();

  // Optional: only verify in dev to avoid extra SMTP roundtrip in prod
  if (process.env.NODE_ENV !== "production") {
    await transporter.verify();
  }

  return transporter.sendMail({
    from,
    to,
    subject,
    html,
    text,
    replyTo,
    attachments,
  });
}