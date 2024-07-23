import { BasePacsFileParser } from "./BasePacsFileParser";
import { Pacs004FileParser } from "./Pacs004FileParser";
import { Pacs008FileParser } from "./Pacs008FileParser";
import { Pacs009FileParser } from "./Pacs009FileParser";

import fs from "fs";

export class PacsFileParserFactory {
  public static createParser(filePath: string): BasePacsFileParser | undefined {
    const xmlData = fs.readFileSync(filePath, "utf-8");

    if (xmlData.includes("urn:FedwireFundsPaymentReturn")) {
      return new Pacs004FileParser();
    } else if (xmlData.includes("urn:FedwireFundsCustomerCreditTransfer")) {
      return new Pacs008FileParser();
    } else if (xmlData.includes("urn:FedwireFundsFinancialInstitutionCreditTransfer")) {
      return new Pacs009FileParser();
    }

    console.error("Unsupported PACS file format.");
    return undefined;
  }
}
