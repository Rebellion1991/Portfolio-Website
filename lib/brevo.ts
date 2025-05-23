import * as SibApiV3Sdk from "@getbrevo/brevo";

const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
apiInstance.setApiKey(
  SibApiV3Sdk.AccountApiApiKeys.apiKey,
  process.env.BREVO_API_KEY || ""
);

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}

export async function sendEmail(options: EmailOptions): Promise<void> {
  const { to, subject, html, replyTo } = options;

  const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
  sendSmtpEmail.subject = subject;
  sendSmtpEmail.htmlContent = html;
  sendSmtpEmail.sender = {
    name: "Ahmed Shenawy",
    email: process.env.CONTACT_EMAIL || "contact@shenawy.xyz",
  };
  sendSmtpEmail.to = [{ email: to }];

  if (replyTo) {
    sendSmtpEmail.replyTo = { email: replyTo };
  }

  try {
    await apiInstance.sendTransacEmail(sendSmtpEmail);
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email");
  }
}
