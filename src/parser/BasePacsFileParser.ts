import { XMLParser } from "fast-xml-parser";
import fs from "fs";
import path from "path";
import { DATA_PATH } from "./parseFedwire";

export interface IFedwireParseInfo {
  MsgId: string; // 1100 Message Disposition
  Amount: number; // 2000 Amount
  SenderAccountNumber: string; // 3100 Sender Account Number
  BeneficiaryFinancialInstitutionID: string; // 3400 Beneficiary Financial Institution ID Code
  BeneficiaryName: string; // 4200 Beneficiary Name
  OriginatorID: string; // 5000 Originator ID Code
  OriginatorFI: string; // 5100 Originator FI (Debtor Agent)
  OBI: string; // 6000 Originator To Beneficiary Information

  BeneficiaryAccount?: string; // 4200 Beneficiary Account
  OriginatorName?: string; // 5000 Originator Name
  BusinessFunctionCode?: string; // 3600 Business Function Code
  UniqueIdentifier?: string; // 4320 Unique Identifier
  CreationDateTime?: string; // Creation DateTime (not specified by tag)
  ReceiptTimestamp?: string; // 1110 Receipt Timestamp
  OMAD?: string; // 1120 OMAD
  IMAD?: string; // 1520 IMAD
  PaymentNotificationInfo?: string; // 3620 Payment Notification Information
  IntermediaryFIInfo?: string; // 4000 Intermediary FI Information
}

export abstract class BasePacsFileParser {
  protected parser: XMLParser;

  constructor() {
    this.parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: "",
      allowBooleanAttributes: true,
      parseTagValue: true,
      trimValues: true,
    });
  }

  protected abstract parseDocument(document: any): IFedwireParseInfo;

  public parseFile(filePath: string): IFedwireParseInfo | undefined {
    const xmlData = fs.readFileSync(filePath, "utf-8");
    const result = this.parser.parse(xmlData);

    // Save result locally for debugging

    const fileName = path.basename(filePath, path.extname(filePath));

    fs.writeFileSync(path.join(DATA_PATH, `${fileName}_parsed.json`), JSON.stringify(result, null, 2));

    const document = this.extractDocument(result);
    if (!document) {
      console.error("Invalid PACS file structure: Missing Document.");
      return;
    }

    return this.parseDocument(document);
  }

  protected abstract extractDocument(parsedResult: any): any;
}
