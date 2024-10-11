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
      res.send({ error: "Invalid Email", userError: "Invalid email!" });
      return;
    }

    const query = `
    INSERT INTO emailing_list (email) 
    VALUES ($1)
    RETURNING *;
  `;

    await db.query(query, [email]);

    res.send({ success: true });
  } catch (err) {
    console.error(`Error subscribing to notifications! ${err}`);
    res.send({ error: err, userError: "Error subscribing with email!" });
  }
};

export default subscribeToNotificationsService;
