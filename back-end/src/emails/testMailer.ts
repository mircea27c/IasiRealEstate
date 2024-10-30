import transporter from "./transporter";

export const sendTestMail = async (_req: any, res: any) => {
  console.log("send the message");

  const mailOptions = {
    from: process.env.SMTP_EMAIL,
    to: "cmircea130@gmail.com",
    subject: "test email",
    text: "this is a test email sent by myself",
  };

  try {
    const info = await transporter.sendMail(mailOptions);

    res.status(200).send({ data: `Send the email: ${info.response}` });
  } catch (error) {
    res.status(400).send({ data: `Error sending email: ${error}` });
  }
};
