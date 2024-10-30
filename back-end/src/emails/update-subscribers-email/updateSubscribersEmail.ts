import transporter from "../transporter";
import NeighbourhoodPriceChange from "../../models/NeighbourhoodPriceChange";
import { getEmailHTML } from "./emailHTMLTemplate";
import capitalize from "../../helpers/capitalize";
import neighbourhoodPriceChange from "../../models/NeighbourhoodPriceChange";

const getEmailText = (priceChanges: NeighbourhoodPriceChange[]) =>
  `Cele mai mari schimbari de pret fata de saptamana trecuta: \n
${priceChanges
  .map(
    (item) =>
      `${capitalize(item.neighbourhood)}: ${item.price} €/m² (${item.change}%)`,
  )
  .join("\n")}
  \n
Vezi preturile aici: https://iasirealestate.onrender.com`;

const sendEmailToSubscriber = async (
  email: string,
  text: string,
  html: string,
  biggestChange: neighbourhoodPriceChange,
) => {
  const mailOptions = {
    from: `"Iasi Real Estate" <${process.env.SMTP_EMAIL}>`,
    to: email,
    subject: `${capitalize(biggestChange.neighbourhood)}: Mai ${biggestChange.change < 0 ? "ieftin" : "scump"} cu ${Math.abs(biggestChange.change)}%!`,
    list: {
      unsubscribe: {
        url: `${process.env.URL}/api/unsubscribe?email=${encodeURIComponent(email)}`,
        comment: "Dezabonare",
      },
    },
    text: text,
    html: html,
  };

  return transporter.sendMail(mailOptions);
};

export const updateSubscribersEmail = async (
  emailingList: string[],
  priceChanges: NeighbourhoodPriceChange[],
) => {
  const biggestChange = priceChanges[0];
  const text = getEmailText(priceChanges);
  try {
    await Promise.allSettled(
      emailingList.map((email) =>
        sendEmailToSubscriber(
          email,
          text,
          getEmailHTML(priceChanges, email),
          biggestChange,
        ),
      ),
    );

    console.log(`Notified subscribers`);
  } catch (error) {
    console.error(`Error emailing owner: ${error}`);
  }
};
