import db from "../../db/db";
import { isEmail } from "validator";

const subscribeToNotificationsService = async (req: any, res: any) => {
  try {
    const email: string = req.body.email;
    if (
      !isEmail(email, {
        allow_utf8_local_part: false,
        require_tld: true,
      })
    ) {
      res.send({ error: "Invalid Email", userError: "Email invalid!" });
      return;
    }

    const existingEmailResult = await db.query(
      `
     SELECT * FROM emailing_list
     WHERE email = $1;
    `,
      [email],
    );

    if (existingEmailResult.rowCount) {
      res.send({
        error: "Already subscribed",
        userError: "Eroare! Esti abonat deja!",
      });
      return;
    }

    await db.query(
      `
    INSERT INTO emailing_list (email) 
    VALUES ($1)
    RETURNING *;
  `,
      [email],
    );

    res.send({ success: true });
  } catch (err) {
    res.send({ error: err, userError: "Eroare la abonare!" });
  }
};

export default subscribeToNotificationsService;
