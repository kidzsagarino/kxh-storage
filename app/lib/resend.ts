import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

type SendEmailArgs = {
  to: string;
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

export async function sendEmail({
  to,
  subject,
  html,
  text,
  attachments,
  replyTo,
}: SendEmailArgs) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.SMTP_FROM;

  if (!apiKey) {
    throw new Error("RESEND_API_KEY missing");
  }

  if (!from) {
    throw new Error("SMTP_FROM missing");
  }

  const emailHtml = html ?? (text ? textToHtml(text) : "<p></p>");

  const payload = {
    from,
    to,
    subject,
    html: emailHtml,

    ...(text ? { text } : {}),
    ...(replyTo ? { replyTo } : {}),

    ...(attachments?.length
      ? {
          attachments: attachments.map((file) => ({
            filename: file.filename,
            content: file.content,
            ...(file.contentType
              ? { contentType: file.contentType }
              : {}),
          })),
        }
      : {}),
  };

  const { data, error } = await resend.emails.send(payload);

  if (error) {
    console.error("Resend error:", error);
    throw new Error(error.message);
  }

  return data;
}

function textToHtml(text: string): string {
  return `<p>${escapeHtml(text).replace(/\n/g, "<br />")}</p>`;
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}