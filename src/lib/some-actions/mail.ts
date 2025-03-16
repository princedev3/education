"use server";
import Mail from "nodemailer/lib/mailer";
import { createTransport } from "nodemailer";

const transport = createTransport({
  service: "gmail",
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS_KEY,
  },
});

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${process.env
    .NEXT_PUBLIC_SITE_URL!}/verify-email?token=${token}`;
  const mailOptions: Mail.Options = {
    from: "Education",
    to: email,
    subject: "Email Confirmation",
    html: `<p>Click <a href="${confirmLink}">here</a> to confirm your email</p>`,
  };
  try {
    const info = await transport.sendMail(mailOptions);
  } catch (error) {
    console.error("Error occurred:", error);
  }
};

export const sendVerificationPasswordEmail = async (
  email: string,
  token: string
) => {
  const confirmLink = `${process.env
    .NEXT_PUBLIC_SITE_URL!}/forgot-password?token=${token}`;
  const mailOptions: Mail.Options = {
    from: "Education",
    to: email,
    subject: "Here is your reset password link",
    html: `<p>Click <a href="${confirmLink}">here</a> to reset your password</p>`,
  };
  try {
    const info = await transport.sendMail(mailOptions);
  } catch (error) {
    console.error("Error occurred:", error);
  }
};
