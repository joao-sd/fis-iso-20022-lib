import { XMLParser } from 'fast-xml-parser';
import { injectable } from 'tsyringe';

@injectable()
export class PACSExtractor {
  private parser: XMLParser;

  constructor() {
    this.parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: '@_',
      removeNSPrefix: true,
    });
  }

  extractAppHdrAndDocument(xmlData: string) {
    const jsonObj = this.parser.parse(xmlData);
    const financialInstitutionCreditTransfer =
      jsonObj?.FedwireFundsIncoming?.FedwireFundsIncomingMessage
        ?.FedwireFundsFinancialInstitutionCreditTransfer;

    const appHdr = financialInstitutionCreditTransfer?.AppHdr;
    const document = financialInstitutionCreditTransfer?.Document;

    return { appHdr, document };
  }
}
