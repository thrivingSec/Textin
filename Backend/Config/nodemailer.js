import nodemailer from 'nodemailer';
import { Verification_Email_Template, Welcome_Email_Template } from './email.template.js';

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: "srijanspl2017@gmail.com",
    pass: "slun xlmg fevz jxse",
  },
});

export const sendVerificationMail = async (emailId, verificationCode) => {
  try {
    const info = await transporter.sendMail({
      from: '"Textin" <srijanspl2017@gmail.com>',
      to: `${emailId}`,
      subject: "Verify your email",
      text: "Verify your email", // plain‑text body
      html: Verification_Email_Template.replace("{verificationCode}", verificationCode), // HTML body
  })
  } catch (error) {
    console.log('Error in sendVerificationMail :: ', error);
  }
}

export const sendWelcomeMail = async (emailId, name) => {
try {
    const info = await transporter.sendMail({
      from: '"Textin" <srijanspl2017@gmail.com>',
      to: `${emailId}`,
      subject: `Welcome ${name}`,
      text: "Welcome", // plain‑text body
      html: Welcome_Email_Template.replace("{name}", name), // HTML body
  })
  } catch (error) {
    console.log('Error in sendVerificationMail :: ', error);
  }
}
