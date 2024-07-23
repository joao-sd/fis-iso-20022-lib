import { XMLParser } from 'fast-xml-parser';

class PACSExtractor {
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

export default PACSExtractor;
