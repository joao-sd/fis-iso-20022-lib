import path from 'path';
import { DATA_PATH } from '../../constants/pathConstants';
import { IFedwireParseInfo } from '../BasePacsFileParser';
import { Pacs008FileParser } from '../Pacs008FileParser';

describe('Pacs008FileParser', () => {
  let parser: Pacs008FileParser;
  let filePath: string;

  beforeAll(() => {
    filePath = path.join(DATA_PATH, 'PACS008_USTreasuryTaxPayment.xml');
  });

  beforeEach(() => {
    parser = new Pacs008FileParser();
  });

  describe('parse', () => {
    let parsedResult: IFedwireParseInfo;

    beforeEach(async () => {
      parsedResult = parser.parseFile(filePath) as IFedwireParseInfo;
    });
  });
});
