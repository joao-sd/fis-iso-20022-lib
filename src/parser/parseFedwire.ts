import path from "path";
import { PacsFileParserFactory } from "./PacsFileParserFactory";

export const DATA_PATH = path.join(__dirname, "../data");

console.log(DATA_PATH);

const filePaths = [
  // path.join(__dirname, "../data/PACS004_PaymentReturn.txt"),
  // path.join(__dirname, "../data/PACS008_CustomerCreditTransfer.txt"),
  // path.join(__dirname, "../data/PACS008_USTreasuryTaxPayment.txt"),

  path.join(DATA_PATH, "PACS004_PaymentReturn.txt"),
  path.join(DATA_PATH, "PACS008_CustomerCreditTransfer.txt"),
  path.join(DATA_PATH, "PACS008_USTreasuryTaxPayment.txt"),
  path.join(DATA_PATH, "PACS009_BankCreditTransfer.txt"),
  path.join(DATA_PATH, "PACS009_CoverPayment.txt"),
];

filePaths.forEach((filePath) => {
  const parser = PacsFileParserFactory.createParser(filePath);
  if (parser) {
    const data = parser.parseFile(filePath);
    if (data) {
      console.log(`${filePath}:`, data);
    }
  }
});
