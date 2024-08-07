import path from 'path';
import { DATA_PATH } from '../../constants/pathConstants';
import { IFedwireParseInfo } from '../../ParserTypes';
import { Pacs009FileParser } from '../Pacs009FileParser';

describe('Pacs009FileParser', () => {
  let parser: Pacs009FileParser;
  let filePath: string;

  beforeAll(() => {
    filePath = path.join(DATA_PATH, 'PACS009_CoverPayment.xml');
  });

  beforeEach(() => {
    parser = new Pacs009FileParser();
  });

  describe('parse', () => {
    let parsedResult: IFedwireParseInfo;

    beforeEach(async () => {
      parsedResult = parser.parseXMLFile(filePath) as IFedwireParseInfo;
    });

    it('should correctly parse the message ID', () => {
      expect(parsedResult.MsgId).toBeDefined();
      expect(typeof parsedResult.MsgId).toBe('string');
    });

    it('should correctly parse the amount', () => {
      expect(parsedResult.Amount).toBeDefined();
      expect(typeof parsedResult.Amount).toBe('number');
      expect(parsedResult.Amount).toBeGreaterThan(0);
    });

    it('should correctly parse the beneficiary financial institution ID', () => {
      expect(parsedResult.BeneficiaryFinancialInstitutionID).toBeDefined();
      expect(typeof parsedResult.BeneficiaryFinancialInstitutionID).toBe(
        'string',
      );
    });

    it('should correctly parse the beneficiary name', () => {
      expect(parsedResult.BeneficiaryName).toBeDefined();
      expect(typeof parsedResult.BeneficiaryName).toBe('string');
    });

    it('should correctly parse the originator ID', () => {
      expect(parsedResult.OriginatorID).toBeDefined();
      expect(typeof parsedResult.OriginatorID).toBe('string');
    });

    it('should correctly parse the originator FI', () => {
      expect(parsedResult.OriginatorFI).toBeDefined();
      expect(typeof parsedResult.OriginatorFI).toBe('string');
    });

    it('should correctly parse the OBI (Originator to Beneficiary Information)', () => {
      expect(parsedResult.OBI).toBeDefined();
      expect(typeof parsedResult.OBI).toBe('string');
    });

    it('should correctly parse the business function code', () => {
      expect(parsedResult.BusinessFunctionCode).toBeDefined();
      expect(typeof parsedResult.BusinessFunctionCode).toBe('string');
    });

    it('should correctly parse the beneficiary account', () => {
      expect(parsedResult.BeneficiaryAccount).toBeDefined();
      expect(typeof parsedResult.BeneficiaryAccount).toBe('string');
    });

    it('should correctly parse the originator name', () => {
      expect(parsedResult.OriginatorName).toBeDefined();
      expect(typeof parsedResult.OriginatorName).toBe('string');
    });

    it('should correctly parse the unique identifier', () => {
      expect(parsedResult.UniqueIdentifier).toBeDefined();
      expect(typeof parsedResult.UniqueIdentifier).toBe('string');
    });

    it('should correctly parse the creation date time', () => {
      expect(parsedResult.CreationDateTime).toBeDefined();
      expect(typeof parsedResult.CreationDateTime).toBe('string');
      expect(parsedResult.CreationDateTime).toMatch(
        /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?[+-]\d{2}:\d{2}$/,
      );
    });

    it('should correctly parse the receipt timestamp', () => {
      expect(parsedResult.ReceiptTimestamp).toBeDefined();
      expect(typeof parsedResult.ReceiptTimestamp).toBe('string');
      expect(parsedResult.ReceiptTimestamp).toMatch(
        /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?[+-]\d{2}:\d{2}$/,
      );
    });

    it('should correctly parse the OMAD', () => {
      expect(parsedResult.OMAD).toBeDefined();
      expect(typeof parsedResult.OMAD).toBe('string');
    });

    it('should correctly parse the IMAD', () => {
      expect(parsedResult.IMAD).toBeDefined();
      expect(typeof parsedResult.IMAD).toBe('string');
    });

    it('should correctly parse the payment notification info', () => {
      expect(parsedResult.PaymentNotificationInfo).toBeDefined();
      expect(typeof parsedResult.PaymentNotificationInfo).toBe('string');
    });
  });
});
