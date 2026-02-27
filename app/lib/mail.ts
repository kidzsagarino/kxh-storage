import sgMail from "@sendgrid/mail";

if (process.env.SMTP_PASS) {
  sgMail.setApiKey(process.env.SMTP_PASS);
}

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
  const from = process.env.SMTP_FROM;
  
  if (!process.env.SMTP_PASS) throw new Error("SENDGRID_API_KEY missing");
  if (!from) throw new Error("SMTP_FROM missing");

  // Fix: Ensure we have at least an empty string to satisfy "MailDataRequired"
  // SendGrid requires either 'text' or 'html' to be defined.
  const msg: sgMail.MailDataRequired = {
    to,
    from,
    subject,
    // Use nullish coalescing to ensure these aren't 'undefined'
    text: text || " ", 
    html: html || text || " ",
    replyTo,
    attachments: attachments?.map((file) => ({
      filename: file.filename,
      content: file.content.toString("base64"),
      type: file.contentType,
      disposition: "attachment",
    })),
  };

  try {
    const [response] = await sgMail.send(msg);
    return response;
  } catch (error: any) {
    if (error.response) {
      console.error("SendGrid Details:", JSON.stringify(error.response.body, null, 2));
    }
    throw error;
  }
}