import { XMLBuilder, XMLParser } from 'fast-xml-parser';
import { injectable } from 'tsyringe';

@injectable()
export class PACSExtractor {
  private parser: XMLParser;
  private builder: XMLBuilder;

  constructor() {
    this.parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: '@_',
    });
    this.builder = new XMLBuilder({
      ignoreAttributes: false,
      attributeNamePrefix: '@_',
    });
  }

  extractAppHdrAndDocument(xmlData: string) {
    const jsonObj = this.parser.parse(xmlData);

    const appHdrJson =
      jsonObj['urn:FedwireFundsIncoming']?.[
        'urn:FedwireFundsIncomingMessage'
      ]?.['urn:FedwireFundsFinancialInstitutionCreditTransfer']?.[
        'urn1:AppHdr'
      ];
    const documentJson =
      jsonObj['urn:FedwireFundsIncoming']?.[
        'urn:FedwireFundsIncomingMessage'
      ]?.['urn:FedwireFundsFinancialInstitutionCreditTransfer']?.[
        'urn2:Document'
      ];

    const appHdr = appHdrJson
      ? this.builder.build({ 'urn1:AppHdr': appHdrJson })
      : null;
    const document = documentJson
      ? this.builder.build({ 'urn2:Document': documentJson })
      : null;

    return { appHdr, document };
  }
}
