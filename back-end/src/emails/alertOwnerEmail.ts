import transporter from "./transporter";
import NeighbourhoodOfferData from "../models/NeighbourhoodOfferData";

const alertOwnerEmail = async (goodDealOffers: NeighbourhoodOfferData[]) => {
  const bestPricePerArea = goodDealOffers.reduce(
    (min: NeighbourhoodOfferData, item: NeighbourhoodOfferData) =>
      item.pricePerArea < min.pricePerArea ? item : min,
    goodDealOffers[0],
  );

  const mailOptions = {
    from: `"Iasi Real Estate" <${process.env.SMTP_EMAIL}>`,
    to: process.env.OWNER_EMAIL,
    subject: `Apartamente iasi: ${Math.round(bestPricePerArea.pricePerArea)} EUR/mp`,
    text: goodDealOffers
      .map(
        (item) => `${item.title}
${item.url}
pret:${Math.round(item.totalPrice)} | suprafata:${item.area} | pret/mp:${Math.round(item.pricePerArea)} EUR\n
    `,
      )
      .join("\n"),
  };

  try {
    const result = await transporter.sendMail(mailOptions);

    console.log(`alert owner mail result: ${result.response}`);
  } catch (error) {
    console.error(`Error emailing owner: ${error}`);
  }
};

export default alertOwnerEmail;
