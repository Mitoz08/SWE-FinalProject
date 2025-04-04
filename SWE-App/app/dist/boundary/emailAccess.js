import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
const emailer = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});
export async function emailSender(To, Subject, Content) {
    const emailDetail = {
        from: process.env.EMAIL_USER,
        to: To,
        subject: Subject,
        text: Content
    };
    try {
        const info = await emailer.sendMail(emailDetail);
        console.log("Email sent:", info.response);
    }
    catch (error) {
        console.error("Error sending email:", error);
    }
    return true;
}
