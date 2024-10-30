import { isEmail } from "validator";
import db from "../../db/db";

const unsubscribeFromNotificationsService = async (req: any, res: any) => {
  try {
    const email: string = req.query.email;
    if (
      !isEmail(email, {
        allow_utf8_local_part: false,
        require_tld: true,
      })
    ) {
      res.send({ error: "Invalid Email", userError: "Email invalid!" });
      return;
    }

    const result = await db.query(
      `
     DELETE FROM emailing_list
     WHERE email = $1;
    `,
      [email],
    );
    res.status(200).send("V-ati dezabonat cu succes!");
  } catch (err) {
    console.error(`Error unsubscribing: ${err}`);
    res.send({
      error: err,
      userError:
        "Eroare la dezabonare! Contactati-ne la preturi.apartamente.iasi@gmail.com",
    });
  }
};

export default unsubscribeFromNotificationsService;
