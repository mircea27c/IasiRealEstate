import neighbourhoodPriceChange from "../../models/NeighbourhoodPriceChange";
import capitalize from "../../helpers/capitalize";
export const getEmailHTML = (
  pricesChanges: neighbourhoodPriceChange[],
  email: string,
) =>
  `
<!DOCTYPE HTML>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Price Changes</title>
</head>
<body style="font-family: Arial, Helvetica, sans-serif; margin: 0; padding: 0; background-color: #E3EBE1FF; width: 100% color: #34543e;">
<table style="margin: 0 auto; border-collapse: collapse;">
   <tr>
      <td>
        <div style="width: 100%; padding: 2px; box-sizing: border-box; display: flex; flex-direction: column; justify-content: center;border-radius: 12px; background-color: rgba(0,0,0,0.05);">
            <div style=" width: 100%; padding: 36px; box-sizing: border-box; border-radius: 12px; background-color: #F2FFF0; border: 2px solid rgba(0,0,0,0.11);">
              <h3 style="margin-bottom: 16px; color: #34543e;">Cele mai mari schimbari de pret fata de saptamana trecuta:</h3>
              <ul style="list-style: none; padding: 0; color: #34543e;">
                  ${pricesChanges
                    .map(
                      (item) => `
                        <li style="margin-bottom: 12px;">
                            <div style="display: flex; align-items: baseline;">
                                <span>${capitalize(item.neighbourhood)}:</span>
                                <strong style="margin-left: 8px;">${item.price}</strong>
                                <span style="font-size: small; margin-left: 4px;">€/m²</span>
                                <div style="display: flex; align-items: baseline; margin-left: 12px; color: ${item.change < 0 ? "#00a400" : "#ff0000"};">
                                    <span style="font-size: small; font-weight: bold;">${item.change}%</span>
                                    <span style="font-size: 15px; font-weight: bold; margin-left: 4px;">${item.change < 0 ? "▼" : "▲"}</span>
                                </div>
                            </div>
                        </li>
                      `,
                    )
                    .join("\n")}
              </ul>
              <br/>
              <h4>Vezi preturile <a href="https://iasirealestate.onrender.com"><b>aici</b></a></h4>
              <p style="font-size: small; color: rgba(52,84,62,0.84);">Click <a href="${process.env.URL}/api/unsubscribe?email=${encodeURIComponent(email)}">aici</a> pentru a te dezabona.</p>              
        </div>
        </td>
   </tr>
</table>
</body>
</html>`;
