import Mailgen from 'mailgen';
import nodemailer from 'nodemailer';
import {
  APP_URL,
  MAIL_HOST,
  MAIL_PASSWORD,
  MAIL_PORT,
  MAIL_USERNAME,
  WHITELIST_DOMAINS,
} from '../constants.js';
const sendMail = async (options) => {
  const mailGenerator = new Mailgen({
    theme: 'default',
    product: {
      name: 'Pic Labs',
      link: APP_URL,
    },
  });

  const emailBody = mailGenerator.generate(options.mailTemplate);
  const emailText = mailGenerator.generatePlaintext(options.mailTemplate);

  const transporter = nodemailer.createTransport({
    host: MAIL_HOST,
    port: MAIL_PORT,
    secure: false,
    auth: {
      user: MAIL_USERNAME,
      pass: MAIL_PASSWORD,
    },
  });
  async function main() {
    const info = await transporter.sendMail({
      from: '"PIC LABS" <pic_labs@pic_labs>',
      to: options.email,
      subject: options.subject,
      text: emailText,
      html: emailBody,
    });
  }
  try {
    await main();
  } catch (error) {
    console.log(error);
  }
};

const verificationMail = (username, verifyurl) => {
  return {
    body: {
      name: username,
      intro: "Welcome to Pic Labs! We're very excited to have you on board.",
      action: {
        instructions: 'To get started with Pic Labs, please click here:',
        button: {
          color: '#22BC66',
          text: 'Confirm your account',
          link: `${verifyurl}`,
        },
      },
      outro: "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };
};

const resetPasswordMail = (otp) => {
  return {
    body: {
      name: 'Pic Labs',
      intro: 'You have requested to reset your password',
      action: {
        instructions: 'To reset your password, please click here:',
        button: {
          color: '#22BC66',
          text: 'Reset Password',
          link: `${WHITELIST_DOMAINS}/api/v1/users/reset-password/${otp}`,
        },
      },
      outro: "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };
};

export { resetPasswordMail, sendMail, verificationMail };
