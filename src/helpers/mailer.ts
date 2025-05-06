import nodemailer from 'nodemailer';
import User from '@/models/userModel';
import bcryptjs from 'bcryptjs';

interface EmailParams {
  email: string;
  emailType: 'verify' | 'reset';
  userId: string;
}

export const sendEmail = async ({ email, emailType, userId }: EmailParams) => {
  try {
    // Create a hash of the userId
    const hashedUserId = await bcryptjs.hash(userId.toString(), 10);

    // Update the user document with the hashed token and expiry time
    if (emailType === 'verify') {
      await User.findByIdAndUpdate(userId, {
        verifiedToken: hashedUserId,
        verifiedTokenExpiry: Date.now() + 3600000, // 1 hour
      });
    } else if (emailType === 'reset') {
      await User.findByIdAndUpdate(userId, {
        resetPasswordToken: hashedUserId,
        resetPasswordExpires: Date.now() + 3600000, // 1 hour
      });
    }

    // Configure the email transporter
    const transporter = nodemailer.createTransport({
      host: 'sandbox.smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASS,
      },
    });

    // Set up the email options
    const mailOptions = {
      from: 'no-reply@example.com',
      to: email,
      subject:
        emailType === 'verify' ? 'Verify your email' : 'Reset your password',
      html: `
        <h1>${
          emailType === 'verify' ? 'Verify your email' : 'Reset your password'
        }</h1>
        <p>
          ${
            emailType === 'verify'
              ? 'Please click the link below to verify your email address:'
              : 'Please click the link below to reset your password:'
          }
        </p>
        <a href="${process.env.DOMAIN}/${
        emailType === 'verify' ? 'verify-email' : 'reset-password'
      }?token=${hashedUserId}">Click here</a>
      `,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};
