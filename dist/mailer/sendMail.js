import nodemailer from "nodemailer";
const forMailUser = process.env.GMAIL_USER;
const forMailPass = process.env.GMAIL_PASS;
const fromUser = process.env.FROM;
const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: forMailUser,
        pass: forMailPass,
    },
    tls: {
        rejectUnauthorized: false,
    },
});
export default {
    sendEmail(from, to, subject, html) {
        return new Promise((resolve, reject) => {
            transport.sendMail({ from: fromUser, subject, to, html }, (err, info) => {
                if (err)
                    reject(err);
                resolve(info);
            });
        });
    },
};
//# sourceMappingURL=sendMail.js.map